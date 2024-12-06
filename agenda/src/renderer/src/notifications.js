export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("Tu navegador no soporta notificaciones.");
    return;
  }

  if (Notification.permission === "default") {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Las notificaciones no están habilitadas.");
      }
    } catch (error) {
      console.error("Error al solicitar permisos de notificación:", error);
      alert("Hubo un error al intentar habilitar las notificaciones.");
    }
  }
};

export const sendNotification = (event) => {
  if (!event || !event.title || !event.date || !event.startTime) {
    console.error("Faltan datos necesarios para la notificación:", event);
    return;
  }

  if (Notification.permission === "granted") {
    const eventDateTime = new Date(`${event.date}T${event.startTime}`);
    const formattedTime = eventDateTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const notification = new Notification(`Evento: ${event.title}`, {
      body: `Inicio: ${formattedTime}\nDescripción: ${event.description || "Sin descripción"}`,
      icon: "/path/to/icon.png", // Cambia esta ruta a tu ícono personalizado
    });

    notification.onclick = () => {
      window.focus(); // Lleva al usuario a la aplicación
      console.log("Notificación clickeada");
    };

    notification.onerror = (error) => {
      console.error("Error al mostrar la notificación:", error);
    };
  } else {
    console.warn("Permiso de notificación no otorgado.");
  }
};

export const checkUpcomingEvents = async (events) => {
  const now = new Date();

  events.forEach(async (event) => {
    const eventDateTime = new Date(`${event.date}T${event.startTime}`);
    const diffInMinutes = (eventDateTime - now) / (1000 * 60);

    // Verificar si la notificación ya se envió o si está fuera de tiempo
    if (!event.notified && diffInMinutes <= 5 && diffInMinutes > 0) {
      sendNotification(event); // Envía la notificación
      await markEventAsNotified(event.id); // Marca el evento como notificado
    }
  });
};

