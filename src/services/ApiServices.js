import axios from "axios";

const Url = `http://10.229.32.69:8000/myapp`;

let token;

async function _sendAudio(data) {
  try {
    const response = await axios.post(`${Url}/translate_audio/`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Réponse de l'API:", response.data);
    const traduction = response.data;
    return traduction;
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du fichier audio api service:",
      error.response?.data || error.message
    );
    throw error;
  }
}

const _sendPhoto = async (photo) => {
  try {
    const response = await axios.post(`${Url}/image_translation/`, photo, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Réponse de l'API:", response.data);
    const transcription = response.data;
    return transcription;
    // Traitez la réponse de l'API ici selon vos besoins
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du fichier audio api service:",
      error
    );
    return error;
  }
};

const _sendVideo = async (data) => {
  try {
    const response = await axios.post(`${Url}/sendvideo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        responseType: "blob", // Spécifie que la réponse est un blob (fichier)
      },
    });

    console.log("Réponse de l'API:", response.data);
    const newVideo = response.data;
    return newVideo;

    // Gérer la réponse de l'API ici
  } catch (error) {
    console.error("Erreur lors de l'envoi de la vidéo à l'API :", error);
    // Gérer les erreurs ici
  }
};

export default {
  Url,
  _sendAudio,
  _sendPhoto,
  _sendVideo,
};
