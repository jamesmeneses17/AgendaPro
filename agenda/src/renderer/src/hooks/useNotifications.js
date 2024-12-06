import { useEffect, useState } from "react";

export const useNotifications = (events) => {
  const [notifiedEvents, setNotifiedEvents] = useState([]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("Tu navegador no soporta notificaciones.");
      return;
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (event) => {
    if (Notification.permission === "granted") {
      const eventTime = new Date(event.date + " " + event.startTime).toLocaleTimeString();

      const notification = new Notification(`Evento: ${event.title}`, {
        body: `Inicio: ${eventTime}`,
        icon: "/path/to/icon.png",
      });

      notification.onclick = () => {
        console.log("Notificación clickeada");
      };
    }
  };

  const checkUpcomingEvents = () => {
    const now = new Date();
    events.forEach((event) => {
      const eventTime = new Date(event.date + " " + event.startTime);

      // Verifica si el evento ya fue notificado
      if (eventTime - now <= 5 * 60 * 1000 && !notifiedEvents.includes(event.id)) {
        sendNotification(event);

        // Agrega el evento a la lista de notificados
        setNotifiedEvents((prev) => [...prev, event.id]);
      }
    });
  };

  return { checkUpcomingEvents };
};
