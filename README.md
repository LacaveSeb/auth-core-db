# 🔐 OTP Auth Core (Email-based Authentication)

A lightweight Node.js authentication core for email + OTP login/registration, built with Express, Joi, JWT, MongoDB, and designed for plug-and-play usage in modern backend projects.

This package handles:

- Email-based OTP authentication

- Auto user creation on first login

- Secure OTP hashing

- User action logging

- Clean DTO & Joi validation architecture

## Required Peer Dependency (⚠️ MUST INSTALL)

- This version requires the following package for OTP generation & email delivery:

```bash

npm install @jehankandy/otp-core-email-core

```

`Without this package, OTP generation and email sending will not work`

## Environment Variables

- Create a `.env` file:

```env

PROJECT_NAME=MyProject
JWT_SECRET=your_jwt_secret
MONGO_URI=mongodb://localhost:27017/yourdb

```

## MongoDB Connection (Required)

- Ensure MongoDB is connected before using this package.

## Required Mongoose Models (Mandatory)

- Your project MUST include the following models with the exact structure.

- following name the model files

- all files must be in `models/` folder

### Role Model `role.model.js`

```js

const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    permissions: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Role", roleSchema);


```

- ⚠️ A default role named `user` must exist in the database.

### User Model `user.model.js`


```js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, trim: true },
    username: { type: String, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    isActive: { type: Boolean, default: true },
    lastLogin: Date,
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);


```

### User Logs Model `userlog.model.js`

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
    ipAddress: {
        type: String
    },
    userAgent: {
        type: String
    },
    metadata: {
        type: Object,
        default: {}
    }
}, { timestamps: true });

module.exports = mongoose.model('Userlogs', UserlogsSchema);


```


### User OTP Model `userotp.model.js`

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

const UserOTP = mongoose.model('UserOTP', UserOTPSchema);

module.exports = UserOTP;


```

- ⚠️ OTP records automatically expire after 15 minutes (900 seconds).

## Express Usage

- in your route (`auth.route.js`) file

```js

const { AuthController } = require("your-package-name");

router.post("/auth/create-auth", AuthController.createAuth);


```

## Important Notes

- MongoDB must be running

- Required models must exist

- Default role user must be created manually

- JWT secret must be set

- Email OTP dependency must be installed

## Author

- Jehan Weerasuriya

## License

- [MIT License]()