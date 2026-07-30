"use client";

import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

export function ClientTracker() {
  const isTracking = useRef(false);

  useEffect(() => {
    // Ensure we only track once per mount in development (StrictMode)
    if (isTracking.current) return;
    isTracking.current = true;

    const trackVisit = async () => {
      try {
        // Check for existing visitor ID
        let visitorId = localStorage.getItem("visitor_id");
        if (!visitorId) {
          visitorId = uuidv4();
          localStorage.setItem("visitor_id", visitorId);
        }

        // Send tracking data to our API
        await fetch("/api/track", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ visitorId }),
        });
      } catch (error) {
        console.error("Failed to track visitor", error);
      }
    };

    // Track initial load
    trackVisit();

    // Track active presence every 3 minutes (180,000 ms) to keep "Live" status updated
    const interval = setInterval(trackVisit, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null; // This component renders nothing
}
