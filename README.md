
# MERN Blog App

This is a full-stack blog application built using the MERN stack (MongoDB, Express, React, and Node.js). The app allows users to read blog posts, and admins can create, update, and delete blog posts. The application also includes user roles with specific functionalities, such as admin and standard users.

## Features

- **User Roles:**
- **Admin:** Can create, update, and delete posts.
- **User:** Can only read blog posts.
- **Responsive Design:** Built with **Flowbite** for clean and modern UI design.
- **State Management:** Managed with **Redux Toolkit** for optimal performance and scalability.
- **Form Validation:** Utilizes **Formik** and **Yup** for user-friendly and reliable form validation.
- **REST API:** Built with **Express** and **Axios** for seamless API calls and interactions.

## Tech Stack

- **Front-end:** React.js
- **Back-end:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Redux Toolkit
- **UI Design:** Flowbite
- **Form Handling and Validation:** Formik and Yup
- **API Requests:** Axios

## Admin and User Logins

### Admin Logins:

- **Admin 1:**
  - **Username:** admin
  - **Password:** Admin@123
- **Admin 2:**
  - **Username:** jhonadmin
  - **Password:** jhonAdmin@123

### User Logins:

- **User 1:**
  - **Username:** rafy
  - **Password:** AbdulRafy@123
- **User 2:**
  - **Username:** user2
  - **Password:** User2@123

### Role Functionality:

- **Admin:**
  - Add, update, and delete posts.
- **User:**
  - Only read posts.

The admin role is currently hardcoded in the database. You can create multiple users with reading access.

## Installation Guide

### Step 1: Clone the Repository

```bash
git clone <repository_url>
```

### Step 2: Install Client-Side Dependencies

1. Navigate to the client directory:

```bash
cd client
```

2. Install all dependencies:

```bash
npm install
```

3. Run the React client:

```bash
npm run dev
```

### Step 3: Install Server-Side Dependencies

1. Navigate to the server directory:

```bash
cd ../server
```

2. Install all dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm run start
```

### Step 4: MongoDB Setup

Ensure that your MongoDB is up and running locally or on MongoDB Atlas. You will need to set up your **MongoDB URI** in the environment file or directly in your server configuration.

## Key Libraries and Tools

1. **React** – For building the user interface.
2. **Node.js** – For running the backend server.
3. **MongoDB** – As the database to store blog posts and users.
4. **Express** – For handling backend API routes.
5. **Redux Toolkit** – For managing global application state.
6. **Axios** – For making API requests between the client and server.
7. **Formik & Yup** – For handling and validating forms efficiently.
8. **Flowbite** – For UI design, ensuring a responsive and modern look.
  
## Folder Structure

```
/client
   /public
   /src
      /components
      /redux
      /views
      App.js
      index.js

/server
   /models
   /routes
   /controllers
   server.js
```

## Usage

Once the client and server are both running:

- Visit the app in your browser at `http://localhost:3000`.
- Login using the provided admin or user credentials.
- Admins will have access to manage posts (create, update, delete).
- Regular users can only view posts.
