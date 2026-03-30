"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, publicDb, storage } from "./firebase";

const defaultGallery = [];

const defaultStore = {
  quotations: [],
  bookings: [],
  ratings: [],
  gallery: defaultGallery,
};

function normalizeDoc(snapshot) {
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

function collectionQuery(database, name) {
  return query(collection(database, name), orderBy("createdAt", "desc"));
}

export function useAdminStore(enabled = true) {
  const [store, setStore] = useState(defaultStore);

  useEffect(() => {
    if (!enabled) return () => {};

    const unsubscribers = [
      onSnapshot(
        collectionQuery(db, "quotations"),
        (snapshot) => {
          setStore((current) => ({ ...current, quotations: snapshot.docs.map(normalizeDoc) }));
        },
        () => {}
      ),
      onSnapshot(
        collectionQuery(db, "bookings"),
        (snapshot) => {
          setStore((current) => ({ ...current, bookings: snapshot.docs.map(normalizeDoc) }));
        },
        () => {}
      ),
      onSnapshot(
        collectionQuery(db, "ratings"),
        (snapshot) => {
          setStore((current) => ({ ...current, ratings: snapshot.docs.map(normalizeDoc) }));
        },
        () => {}
      ),
      onSnapshot(
        collectionQuery(db, "gallery"),
        (snapshot) => {
          const gallery = snapshot.docs.map(normalizeDoc);
          setStore((current) => ({ ...current, gallery: gallery.length ? gallery : defaultGallery }));
        },
        () => {}
      ),
    ];

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [enabled]);

  return store;
}

export function usePublicGallery() {
  const [gallery, setGallery] = useState(defaultGallery);

  useEffect(() => {
    return onSnapshot(
      collectionQuery(publicDb, "gallery"),
      (snapshot) => {
        const nextGallery = snapshot.docs.map(normalizeDoc);
        setGallery(nextGallery.length ? nextGallery : defaultGallery);
      },
      () => {
        setGallery(defaultGallery);
      }
    );
  }, []);

  return gallery;
}

export function useApprovedRatings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    return onSnapshot(
      collectionQuery(publicDb, "ratings"),
      (snapshot) => {
        const nextRatings = snapshot.docs
          .map(normalizeDoc)
          .filter((item) => item.status === "approved");
        setRatings(nextRatings);
      },
      () => {
        setRatings([]);
      }
    );
  }, []);

  return ratings;
}

export async function submitBooking(payload) {
  const booking = {
    createdAt: new Date().toISOString(),
    status: "pending",
    ...payload,
  };

  const docRef = await addDoc(collection(db, "bookings"), booking);
  return { id: docRef.id, ...booking };
}

export async function submitQuotation(payload) {
  const quotation = {
    createdAt: new Date().toISOString(),
    status: "pending",
    ...payload,
  };

  const docRef = await addDoc(collection(db, "quotations"), quotation);
  return { id: docRef.id, ...quotation };
}

export async function submitRating(payload) {
  const rating = {
    createdAt: new Date().toISOString(),
    status: "pending",
    ...payload,
  };

  await addDoc(collection(db, "ratings"), rating);
  return rating;
}

export async function setRatingStatus(ratingId, status) {
  await updateDoc(doc(db, "ratings", ratingId), {
    status,
    moderatedAt: new Date().toISOString(),
  });
}

export async function deleteRating(ratingId) {
  await deleteDoc(doc(db, "ratings", ratingId));
}

export async function addGalleryItem(payload) {
  const galleryId = `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const beforePath = `gallery/${galleryId}/before`;
  const afterPath = `gallery/${galleryId}/after`;

  await uploadString(ref(storage, beforePath), payload.before, "data_url");
  await uploadString(ref(storage, afterPath), payload.after, "data_url");

  const before = await getDownloadURL(ref(storage, beforePath));
  const after = await getDownloadURL(ref(storage, afterPath));

  const item = {
    title: payload.title,
    before,
    after,
    beforePath,
    afterPath,
    createdAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "gallery", galleryId), item);
  return { id: galleryId, ...item };
}

export async function deleteGalleryItem(item) {
  await deleteDoc(doc(db, "gallery", item.id));

  const cleanup = [];
  if (item.beforePath) cleanup.push(deleteObject(ref(storage, item.beforePath)).catch(() => {}));
  if (item.afterPath) cleanup.push(deleteObject(ref(storage, item.afterPath)).catch(() => {}));
  await Promise.all(cleanup);
}

export async function markQuotationStatus(quotationId, status) {
  await updateDoc(doc(db, "quotations", quotationId), {
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteQuotation(quotationId) {
  await deleteDoc(doc(db, "quotations", quotationId));
}

export async function markBookingStatus(bookingId, status) {
  await updateDoc(doc(db, "bookings", bookingId), {
    status,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteBooking(bookingId) {
  await deleteDoc(doc(db, "bookings", bookingId));
}
