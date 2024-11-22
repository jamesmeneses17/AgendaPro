const axios = require('axios');

// Token de tu bot (proporcionado por BotFather)
const BOT_TOKEN = '7838335096:AAGebRkhvmF4qpXuP0RMgRLGSe_nllpAE9A';

// URL base de la API de Telegram
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// Chat ID fijo (reemplázalo con el tuyo)
const CHAT_ID = '1271362249'; // Reemplaza con tu chat ID.

/**
 * Función para enviar mensajes por Telegram.
 * @param {string} message - Mensaje que quieres enviar.
 */
async function sendTelegramMessage(message) {
  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
    });
    console.log('Mensaje enviado:', response.data);
  } catch (error) {
    console.error('Error al enviar mensaje:', error.response?.data || error.message);
  }
}

module.exports = { sendTelegramMessage };
