import { environment } from "environments/environment";

type GeneratedImage = Image | null;

interface Image {
    url: string;
}

export const imageVariationUseCase = async ( 
    originalImag: string,
): Promise<GeneratedImage> => {
    try {
        const resp = await fetch(`${ environment.backendApi }/image-variation`,{
            method: 'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                baseImage: originalImag,
            }),
        });

        const { url } = await resp.json();

        return { url };

    } catch (error) {
        console.log(error);
        return null;
    }
}