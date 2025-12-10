import { GoogleGenAI, Chat } from "@google/genai";

let chatSession: Chat | null = null;

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not defined.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const initializeChat = async () => {
  const ai = getAIClient();
  if (!ai) throw new Error("API Key missing");

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `Anda adalah 'SultanAssistant', konsultan perjalanan AI untuk agen travel mewah 'SultanUmrah'. 
      Gunakan bahasa Indonesia yang sopan, elegan, namun persuasif.
      Karakteristik brand: Neobrutalism, tegas, mewah, tanpa basa-basi, fokus pada kualitas VIP.
      
      Tugas utama:
      1. Menjelaskan paket Umrah & Haji VIP kami (Hotel bintang 5 depan Haram, Business Class, Private Mutawwif).
      2. Menjawab pertanyaan seputar persiapan ibadah haji/umrah.
      3. Meyakinkan klien bahwa harga kami sebanding dengan fasilitas "Sultan" yang didapat.
      
      Jangan berikan informasi harga spesifik yang mengikat, berikan kisaran mulai dari Rp 45 Juta untuk Umrah VIP.
      Jawablah dengan ringkas dan to the point.`,
    },
  });
};

export const sendMessageToAI = async (message: string): Promise<string> => {
  if (!chatSession) {
    await initializeChat();
  }
  
  if (!chatSession) {
    return "Maaf, sistem AI sedang tidak tersedia saat ini. Silakan hubungi admin via WhatsApp.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Terjadi kesalahan koneksi. Silakan coba lagi nanti.";
  }
};