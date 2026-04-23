# SarahaApp

SarahaApp is an anonymous messaging platform built with Node.js, Express, and MongoDB. It allows users to send and receive anonymous messages, similar to a modern version of PostSecret. The app includes user authentication, message management, and administrative features.

## Features

### Authentication

- **User Registration**: Sign up with email, password, and other details. Email confirmation required via OTP.
- **User Login**: Standard login with email and password.
- **Social Login**: Login using Google authentication.
- **Email Confirmation**: Confirm email address using OTP sent via email.
- **Resend OTP**: Resend OTP for email confirmation.
- **Password Reset**: Forget password functionality with OTP-based reset.
- **Refresh Token**: Generate new access tokens using refresh tokens.
- **Logout**: Secure logout functionality.

### User Management

- **Profile Management**: View and update user profiles (admin access).
- **Create User**: Create new user accounts.
- **Update User**: Update user information.
- **Update Password**: Change user passwords securely.
- **File Upload**: Upload profile pictures or attachments.
- **Account Management**:
  - Freeze Account: Temporarily disable user accounts.
  - Restore Account: Re-enable frozen accounts (admin only).
  - Delete Account: Permanently delete user accounts.

### Messaging

- **Send Anonymous Messages**: Send messages to other users anonymously by providing receiver ID.
- **View Messages**: Authenticated users can view messages sent to them.

### Security and Middleware

- **Authentication**: JWT-based authentication with access and refresh tokens.
- **Authorization**: Role-based access control (Admin, User).
- **Rate Limiting**: Custom rate limiter to prevent abuse.
- **Validation**: Input validation using Joi.
- **Encryption and Hashing**: Secure password hashing with bcrypt and argon2.
- **CORS and Helmet**: Security headers and cross-origin resource sharing.

### Utilities

- **Email Notifications**: Send emails using Nodemailer with custom templates.
- **OTP Generation**: Generate one-time passwords for verification.
- **File Upload**: Handle file uploads with Multer.
- **Logging**: Request logging with Morgan for different modules (auth, user, message).
- **Database**: MongoDB connection with Mongoose ODM.

### Admin Features

- View user profiles.
- Freeze and restore user accounts.
- Manage user data.

## Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd SarahaApp
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   DB_URL=mongodb://localhost:27017/sarahaapp
   JWT_SECRET=your-jwt-secret
   REFRESH_SECRET=your-refresh-secret
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-email-password
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The server will run on `http://localhost:3000`.

## API Endpoints

### Authentication

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login
- `POST /auth/refresh-Token` - Refresh access token
- `POST /auth/social-login` - Google social login
- `POST /auth/logout` - Logout
- `PATCH /auth/confirm-Email` - Confirm email
- `PATCH /auth/resend-otp` - Resend OTP
- `PATCH /auth/forgetPassword` - Forget password
- `PATCH /auth/resetPassword` - Reset password

### User

- `GET /user/getProfile` - Get user profile (admin)
- `POST /user/create` - Create user
- `PATCH /user/update/:id` - Update user
- `PATCH /user/upload-file` - Upload file
- `PATCH /user/updatePassword` - Update password
- `DELETE /user/:userId/freezeAccount` - Freeze account
- `PATCH /user/:userId/restoreAccount` - Restore account (admin)
- `DELETE /user/:userId/deleteAccount` - Delete account

### Message

- `POST /message/:receiverId/send-message` - Send anonymous message
- `GET /message/get-message` - Get received messages

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt, argon2
- **Validation**: Joi
- **Email**: Nodemailer
- **File Upload**: Multer
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Other**: UUID, OTP Generator, Google Auth Library

## Project Structure

```
SarahaApp/
├── main.js
├── package.json
├── config/
│   └── config.service.js
├── src/
│   ├── app.controller.js
│   ├── DB/
│   │   ├── connection.js
│   │   ├── db.repository.js
│   │   ├── index.js
│   │   └── Models/
│   │       ├── index.js
│   │       ├── message.model.js
│   │       ├── token.model.js
│   │       └── user.model.js
│   ├── Middlewares/
│   │   ├── auth.middleware.js
│   │   ├── rate.limtter.middleware.js
│   │   └── validation.middleware.js
│   ├── Modules/
│   │   ├── index.js
│   │   ├── Auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.validation.js
│   │   │   └── index.js
│   │   ├── Message/
│   │   │   ├── index.js
│   │   │   ├── message.controller.js
│   │   │   ├── message.service.js
│   │   │   └── message.validation.js
│   │   └── User/
│   │       ├── index.js
│   │       ├── user.controller.js
│   │       ├── user.service.js
│   │       └── user.validation.js
│   └── Utils/
│       ├── generate_otp.js
│       ├── email/
│       │   ├── email.utils.js
│       │   └── generalTemplate.js
│       ├── Enums/
│       │   ├── hash.enum.js
│       │   └── user.enum.js
│       ├── events/
│       │   └── email.events.js
│       ├── Logger/
│       │   ├── auth.logger
│       │   ├── message.logger
│       │   ├── morgan.logger.js
│       │   └── user.logger
│       ├── multer/
│       │   ├── index.js
│       │   └── local.multer.js
│       ├── response/
│       │   ├── error.response.js
│       │   ├── index.js
│       │   └── succes.response.js
│       ├── security/
│       │   ├── encryption.js
│       │   └── hash.js
│       └── tokens/
│           └── token.js
└── uploads/
    ├── general/
    └── user/
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the ISC License.
