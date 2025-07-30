QrScannerApp A beginner-friendly mobile app built with React Native using Expo


Note :To run this project locally, create a .env file in the root directory and add the following:


Core Features:

User login with Firebase Authentication

Scan QR Codes using the phone camera

Save scanned data to Supabase

View your personal scan history



.env File Setup

Create a file named .env in the root directory of your project and add:

REACT_APP_SUPABASE_URL=your_supabase_url_here  

REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here

These keys are private and not shared in the repository. Get them from your Supabase project settings.


Features Overview:

Login using Supabase Auth

Scan QR Codes with the device camera (using expo-camera)

Store scanned data to Supabase with timestamp and user email

View personal scan history neatly


Tech Stack:

React Native (with Expo)

Supabase Authentication & Database

Expo Camera API


Installation & Run Locally:

Clone the repo:

git clone https://github.com/your-username/ScannerApp.git

cd ScannerApp


Install dependencies:

npm install

Add your .env file 


Start the development server:

npx expo start

You can scan the QR code with Expo Go app on your phone to test it.
