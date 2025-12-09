# Google OAuth Setup Instructions

To enable Google Sign-In, follow these steps:

## 1. Create Google Cloud Project

1. Go to https://console.cloud.google.com/
2. Create a new project or select existing one
3. Navigate to "APIs & Services" > "Credentials"

## 2. Configure OAuth Consent Screen

1. Click "OAuth consent screen" in the left sidebar
2. Choose "External" user type
3. Fill in:
   - App name: Career Compass
   - User support email: your email
   - Developer contact: your email
4. Add scopes: email, profile
5. Add test users: your email (for testing)

## 3. Create OAuth Client ID

1. Click "Credentials" > "+ CREATE CREDENTIALS" > "OAuth client ID"
2. Application type: "Web application"
3. Name: Career Compass Web Client
4. Authorized JavaScript origins:
   - http://localhost:3000
   - http://localhost:3001
5. Authorized redirect URIs:
   - http://localhost:3000
   - http://localhost:3001
6. Click "CREATE"
7. Copy your **Client ID**

## 4. Update Your App

1. Open `frontend/.env.local`
2. Replace: `NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here`
3. With: `NEXT_PUBLIC_GOOGLE_CLIENT_ID=YOUR_ACTUAL_CLIENT_ID`
4. Restart the frontend: `npm run dev`

## 5. Test

1. Go to http://localhost:3001/login
2. Click "Sign in with Google"
3. It should now work!

---

**Note:** The app works perfectly without Google OAuth using username/password authentication.
