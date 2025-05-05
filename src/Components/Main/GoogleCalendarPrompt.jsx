import { useEffect } from "react";
import { gapi } from "gapi-script";
import { convertEventToGoogle } from "../../utils.js";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
const SCOPE = "https://www.googleapis.com/auth/calendar.events";

export default function GoogleCalendarPrompt({ event, user, onSuccess, onCancel }) {
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: SCOPE,
      });
    });
  }, []);

  function isGmail(email) {
    return email && email.toLowerCase().endsWith("@gmail.com");
  }

  function handleAddToGoogleCalendar() {
      const authInstance = gapi.auth2.getAuthInstance();
      const googleEvent = convertEventToGoogle(event);
      console.log(googleEvent)

    const isUserGmail = isGmail(user?.email);

    const ensureSignedIn = () => {
      const currentUser = authInstance.currentUser.get();
      const isAuthorized = currentUser?.isSignedIn() && currentUser.getGrantedScopes().includes(SCOPE);

      if (!isAuthorized || !isUserGmail) {
        return authInstance.signIn(); 
      }
      return Promise.resolve(currentUser);
    };

    ensureSignedIn().then(user => {
      const token = user.getAuthResponse().access_token;

      gapi.client.request({
        path: "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        method: "POST",
        body: JSON.stringify(googleEvent),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then(
        (res) => {
          console.log("Event added:", res);
          alert("Event added to Google Calendar.");
          onSuccess?.();
        },
        (err) => {
          console.error("Error adding event:", err);
          alert("Failed to add event.");
          onCancel?.();
        }
      );
    }).catch(err => {
      console.error("Sign-in failed:", err);
      alert("Google sign-in is required to add events.");
      onCancel?.();
    });
  }

  return (
    <div className="google-calendar-prompt">
      <p>Do you want to add this event to your Google Calendar?</p>
      <div>
        <button onClick={handleAddToGoogleCalendar}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
    </div>
  );
}

