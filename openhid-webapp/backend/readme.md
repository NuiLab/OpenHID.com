# ⚪ OpenHID Backend

OpenHID is powered by a simple REST API that handles authentication, user accounts, and publications.

## Installation

You will need a `auth.json` file at the root of the backend that conforms to the following schema:

```ts
type AuthConfig = {

  // JSON Web Token Secret
  encryptionKey: string,

  // Email Credentials
  emailAuth: {
    user: string,
    pass: string
  }

}
```

### User Authentication

```ts
type UserAPI = {
  username: string,
  email?: string,
  token?: string,
  password: string
}
```

- `api/v1/login` - Ask to login to the application, gives a JSON web token that can be stored on the user's account and verified to be sure the user is logged in.
- `api/v1/register` - Register as a user to the application.
- `api/v1/forgot` - Request an email to recover a forgot password.
- `api/v1/recover` - Create a new password based on a auth token.

### Publications and Users

- `api/v1/auth/user` - Edit your or several user accounts (depending on permissions).
- `api/v1/auth/post` - Edit or Post a publication(s) (depending on permissions).

### Open Queries

- `api/v1/post` - Query for different posts.
- `api/v1/user` - Query for different users.