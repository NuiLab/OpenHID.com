# ⚪ OpenHID API v1.0

## User Authentication

```ts
type UserAPI = {
  username: string,
  email?: string,
  password: string
}
```

- `api/v1/login` - Ask to login to the application, gives a JSON web token that can be stored on the user's account and verified to be sure the user is logged in.
- `api/v1/register` - Register as a user to the application
