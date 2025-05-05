# Event Platform Web App

## 🌍 Project Summary

This is a web-based event platform designed to help users discover events across major cities in the **UK and US**. Users can:

- Browse events by location and **sort by categories**.
- Save events to a **“Going” list** or a **Favourites** list.
- **Create a new account** or **edit their user profile**.
- **Organisers** (signed-in with an organiser account) can:
  - Create new events.
  - Edit or delete their own events.
  - Manage events from the **"My Events"** dashboard.

Additional feature: Users can **sync events to their Google Calendar** by logging into their Google account.

---

## 👤 Test Account Access

- The web app is **automatically signed in** as `user1` on first load.
- You can **log out** and create a new account at any time.
- To use the **Google Calendar sync**, you’ll need to **log into your own Google account** when prompted.

---

## ⚙️ Running the Project Locally

### 1. **Clone the Repository**
```bash
git clone https://github.com/benedict-robinson/event-platform.git
cd event-platform
```
### 2. Install Dependencies

Make sure you have **Node.js** and **npm** installed.
```bash
npm install
```
### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following (example values shown):

```env
VITE_API_BASE_URL=https://eventure-backend-api.onrender.com/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_API_KEY=your-google-api-key
```
Note: You may need to register your app with Google Cloud to obtain a GOOGLE_CLIENT_ID and enable the Google Calendar API.

### 4. Start the App
```bash
npm run dev
```
The app should now be running at: http://localhost:5173
