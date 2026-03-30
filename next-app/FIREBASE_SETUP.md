# Firebase Setup

## Admin auth

Create at least one Firebase Authentication user with the `Email/Password` provider enabled.

The `/admin` page now requires Firebase sign-in before the dashboard is shown.

## Firestore collections used

- `quotations`
- `bookings`
- `ratings`
- `gallery`

## Storage paths used

- `gallery/{id}/before`
- `gallery/{id}/after`

## Rules files

- [firestore.rules](/c:/Users/kally/Desktop/Development/FIONAT/next-app/firestore.rules)
- [storage.rules](/c:/Users/kally/Desktop/Development/FIONAT/next-app/storage.rules)

Publish them with the Firebase CLI for the `fionat-service` project.
