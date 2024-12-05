

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    alert("Tu navegador no soporta notificaciones.");
    return;
  }

  if (Notification.permission !== "granted") {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Las notificaciones no están habilitadas.");
    }
  }
};

export const sendNotification = (event) => {
  if (Notification.permission === "granted") {
    const eventTime = new Date(event.date + " " + event.startTime).toLocaleTimeString();

    const notification = new Notification(`Evento: ${event.title}`, {
      body: `Inicio: ${eventTime}`,
      icon: "/path/to/icon.png", // Cambia esta ruta si tienes un ícono personalizado
    });

    notification.onclick = () => {
      console.log("Notificación clickeada");
    };
  }
};
