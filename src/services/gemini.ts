import { GoogleGenAI } from "@google/genai";
import { env } from "../env.ts";

const gemini = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64 : string, mimeType : string) {
    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: 'You are an expert in audio transcription. Transcribe the audio into Brazilian Portuguese. Be accurate and natural in your transcription. Maintain proper punctuation and divide the text into paragraphs where appropriate.',
            },
            {
                inlineData: {
                    mimeType,
                    data: audioAsBase64,
                }
            }
        ],
    });

    if (!response.text) {
        throw new Error('Não foi possível converter o áudio');
    }

    return response.text;
}

export async function generateEmbeddings(text: string) {
    const response = await gemini.models.embedContent({
        model: 'text-embedding-004',
        contents: [{ text }],
        config: {
            taskType: 'RETRIEVAL_DOCUMENT',
        }
    });

    if (!response.embeddings?.[0].values) {
        throw new Error('Não foi possível gerar os embeddings.');
    }

    return response.embeddings[0].values;
}

export async function generateAnswer(question: string, transcriptions: string[]) {
    const context = transcriptions.join('\n\n');

    const prompt = `
        Based on the text provided below as context, answer the question clearly, accurately, and coherently in Brazilian Portuguese.
    
        CONTEXT:
        ${context}

        QUESTION:
        ${question}

        INSTRUCTIONS:
        - Use only information contained in the context provided;
        - If the answer cannot be found in the context, simply respond that you do not have enough information to answer (still in Brazilian Portuguese).
        - Be objective;
        - Maintain an educational and professional tone;
        - Quote relevant excerpts from the context if appropriate;
        - If quoting the context, use the term "conteúdo da aula", the term being, as the whole content, in Brazilian Portuguese;
    `.trim();

    const response = await gemini.models.generateContent({
        model,
        contents: [
            {
                text: prompt,
            }
        ]
    });

    if (!response.text) {
        throw new Error('Falha ao gerar resposta pelo Gemini');
    }

    return response.text;
}
