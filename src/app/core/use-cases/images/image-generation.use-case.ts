import { environment } from "environments/environment";

type GeneratedImage = Image | null;

interface Image {
    url: string;
}

export const imageGenerationUseCase = async ( 
    prompt: string, 
    originalImag?: string, 
    maskImage?: string, 
): Promise<GeneratedImage> => {
    try {
        const resp = await fetch(`${ environment.backendApi }/image-generation`,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                prompt,
                originalImag,
                maskImage,
            }),
        });

        const { url } = await resp.json();

        return { url };

    } catch (error) {
        console.log(error);
        return null;
    }
}