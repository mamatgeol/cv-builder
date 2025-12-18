import { useEffect, useRef } from "react";

export default function useAutoSave(data, delay = 2000) {
  const timeoutRef = useRef(null);
  const lastSavedRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Hindari autosave pertama kali (saat load dari DB)
    if (lastSavedRef.current === null) {
      lastSavedRef.current = JSON.stringify(data);
      return;
    }

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const current = JSON.stringify(data);

      // Jangan save kalau datanya sama
      if (current === lastSavedRef.current) return;

      const token = localStorage.getItem("token");

      await fetch("http://localhost:8080/cv", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: current
      });

      lastSavedRef.current = current;
      console.log("Autosaved ✔");
    }, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [data, delay]);
}
