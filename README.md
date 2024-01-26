# telegram-app

## Docker

To run the project in docker - `docker-compose up`

## Developing

Install dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

### Main Flow

- User sends a request to the '/' route. The backend creates a token (I call it a CSRF token) and stores it in the tokens array.
- The user can then choose to sign up or log in.
- Both the sign-up and login forms have a Yup schema with validation. TelegramId is required and must be a string with at least 6 digits, and the password is required and must be at least 8 characters long.

### Signup

- When the user's input is validated, and they click the "Sign Up" button, they are presented with their CSRF token.
- The field with the token has an onclick event that copies the token to the clipboard.
- When the user clicks the "OK" button, a POST request is sent to the backend with their credentials and token.
- If all fields are valid, a success response is sent to the frontend, and the user gets redirected to the /login page. The data is stored in a userData object (createdAt field is generated, password is hashed with bcrypt).
- If some fields are invalid, an error message is returned and displayed at the bottom of the form.

### Login

- When the user's input is validated and they click the "Log in" button, a POST request is sent to the backend with their credentials (TelegramId and password). They are validated against the userData object (password is checked with bcrypt.compare).
- If credentials are valid, a session token is generated and returned to the user with a "session" cookie. The user is then redirected to the /profile page.
- If credentials are not valid, the frontend receives an error message that is displayed to the user at the bottom of the login form.

### Profile

- On a request to the /profile page, the backend checks for the session cookie. If the session doesn't exist, it redirects the request to the login page.
- If the session cookie is valid, the user is presented with an input field for their CSRF token.
- When the user clicks "OK", the token is sent to the backend with a POST message.
- If the token is valid, the backend sends the profile data (TelegramId, createdAt) back. The user is then presented with a box displaying this data.
- If the token is invalid, the session cookie gets deleted, and the user is redirected to the sign-up form.