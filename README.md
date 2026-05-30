
## Sanjivani – Donation Management Platform

Sanjivani is a secure and user-friendly donation management platform designed to streamline donor registration, donations, and administrative monitoring. It provides a seamless experience for donors and a powerful dashboard for administrators to track and manage donations effectively.# Features

## Donor Module
- User signup and login
- Welcome email after successful signup
- OTP-based verification during login
- Donor dashboard
- Donate any amount securely
- View donation history and registration details
- Edit profile (optional)

## Admin Module
- Admin login using credentials (no OTP verification)
- Admin dashboard with key metrics:
  - Total registrations
  - Total donations
  - Total donation amount
- Donor list management:

  - Export all user registration details in form of csv file
  - Filter donors by registration date
  - Include donors with zero donations
  - Sort donors based on donated amount
- Complete donation history:
  - Donor details
  - Donated amount
  - Donation status
  - Payment Intent ID




## Donor Flow

- Signup
- Welcome email received
- Login
- OTP verification
- Donor dashboard
- Donate any amount
- View donation history / registration details
- Edit profile (optional)

## Admin Flow

- Admin login
- Credential verification (no OTP)
- Admin dashboard

### View metrics

- Total registrations
- Total donations
- Total donation amount
- Donor list

### Filter / sort donors

- Registration date
- Include 0 donations
- Donated amount

### Select donor

- View full donation history:
  - Donor details
  - Donated amount
  - Status
  - Payment Intent ID

- Logout
## Tech Stack

- Frontend: React
- Backend: Node.js
- Database: MongoDB
- Authentication: JWT & OTP-based verification
- Payment Gateway: Stripe
- Email Service: SMTP 

## Installation & Setup

- Clone the repository:  
  `git clone https://github.com/your-username/sanjivani.git`

- Navigate to the project directory:  
  `cd sanjivani`

- Install dependencies:  
  `npm install`

- Start the development server:  
  `npm run dev`

## Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=XXXX
MONGODB_URI=your_mongodb_connection_string
PASS=your_database_password
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password
SENDER_EMAIL=your_email_address
Cloud_Name=your_cloudinary_cloud_name
Cloud_Api=your_cloudinary_api_key
Cloud_Secret=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
VITE_BACKEND_URL=your_backend_url
```


## Demo Video

The video shows complete working of the NGO registration and management system:
https://drive.google.com/drive/folders/1MKhB5rRypOCezxjhXCI5d8lrgIPuSu0i?usp=sharing
## Admin Credentials

Email :  none48504@gmail.com

Password: January@2026
