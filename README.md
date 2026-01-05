# 🔐 OTP Auth Core (Email-based Authentication)

- A lightweight Node.js authentication core for email + OTP login/registration, built with Express, Joi, JWT, MongoDB, and designed for plug-and-play usage in modern backend projects.

- This package provides a ready-to-use authentication flow with minimal setup while keeping full control in your main backend.

## ✨ Features

- Email-based OTP authentication

- Auto user creation on first login

- Secure OTP hashing & expiry

- Login attempt tracking

- User action logging

- Clean DTO + Joi validation structure

- JWT-based authentication

## 📦 Installation

```bash

npm install @jehankandy/auth-core-db

```

- No additional OTP or email core packages are required.


## 🔧 Environment Variables

- Create or update a .env file in your root backend folder:

```env

PROJECT_NAME=MyProject
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/yourdb

EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
PROJECT_NAME="your-project-name"

```

## 🗄️ MongoDB (Required)

- MongoDB must be connected before using this package

- The package does not create models automatically

## 📁 Required Project Structure

- Your backend must follow this structure:

```pgsql

root-backend/
├── models/
│   ├── role.model.js
│   ├── user.model.js
│   ├── userlog.model.js
│   └── userotp.model.js
│
├── routes/
│   └── auth.route.js
│
├── .env
└── app.js / server.js


```

## 🧩 Required Mongoose Models (MANDATORY)

- These models are NOT included in the npm package.

- They must exist in your backend under `models/`.

### Role Model `(models/role.model.js)`

```js

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Role", roleSchema);



```

### ⚠️ Important

- Your database must contain a role record with:

```json

{
  "name": "user"
}


```

Example valid roles:

- `admin`

- `developer`

- `user` ✅ (required)


### User Model `(models/user.model.js)`

```js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, trim: true },
    username: { type: String, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    isActive: { type: Boolean, default: true },
    login_attempt: { type: Number, default: 0 },
    lastLoginAttemptAt: { type: Date },
    lastLogin: Date,
});

module.exports = mongoose.model('User', UserSchema);

```

### User Logs Model `(models/userlog.model.js)`

```js

const mongoose = require('mongoose');

const UserlogsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        required: true,
        default: 'other'
    },
    description: {
        type: String,
        trim: true
    },
    ipAddress: String,
    userAgent: String,
    metadata: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('Userlogs', UserlogsSchema);


```

### User OTP Model `(models/userotp.model.js)`

```js

const mongoose = require('mongoose');

const UserOTPSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900
    }
}, { timestamps: true });

module.exports = mongoose.model('UserOTP', UserOTPSchema);


```

- ⏱️ OTP records auto-expire after 15 minutes (900 seconds).


## 🚀 Express Route Usage

- Create or update `routes/auth.route.js` in your backend:

```js

const express = require("express");
const router = express.Router();

const { AuthController } = require("@jehankandy/auth-core-db");

router.post("/create-auth", AuthController.createAuth);
router.post("/verify-otp", AuthController.verifyOTP);

module.exports = router;


```

- Mount the route in your main app:

```js

app.use("/auth", require("./routes/auth.route"));

```


## ⚠️ Important Notes

- MongoDB must be running

- All required models must exist

- A user role record must exist

- JWT secret must be set

- Email credentials must be valid

- OTP emails are sent automatically

## 👤 Author

- Jehan Weerasuriya
Creator of JKCSS, CoconutDB, and enterprise backend frameworks


📄 License

[MIT License](https://github.com/BackendExpert/auth-core-db/blob/master/LICENSE)
