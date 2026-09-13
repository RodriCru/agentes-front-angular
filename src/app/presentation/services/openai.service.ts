/**
 * Paso 3 del Use Case creado mandar a llamarlo y pasarle los parámetros
 */
import { Injectable } from '@angular/core';
import { orthographyUseCase, prosConsUseCase, prosConsStreamUseCase, textToAudioUseCase } from '@use-cases/index';
import { translateTextUseCase } from '@use-cases/translate/translate-text.use-case';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    checkOrthography( prompt: string ){
        return from ( orthographyUseCase(prompt) );
    }

    prosConsDiscusser ( prompt: string ){
        return from ( prosConsUseCase(prompt));
    }
    
    prosConsStreamDiscusser ( prompt: string, abortSignal: AbortSignal){
        return prosConsStreamUseCase(prompt, abortSignal);
    }

    translaste( prompt: string, lang: string){
        return from( translateTextUseCase(prompt, lang) );
    }

    textToAudio( prompt: string, voice: string){
        return from( textToAudioUseCase(prompt, voice) );
    }
}