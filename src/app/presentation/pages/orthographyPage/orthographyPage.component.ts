import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GptMessageComponent } from '@Components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMeesageComponent } from '@Components/chat-bubbles/myMeesage/myMeesage.component';
import { TypingLoaderComponent } from '@Components/typingLoader/typingLoader.component';
import { TextMessageBoxComponent } from '@Components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@Components/text-boxes/textMessageBoxFile/textMessageBoxFile.components';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@Components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMeesageComponent,
    TypingLoaderComponent,

    //Obligatoriamente se descomenta una las otras dos deben de comentarse

    //TextMessageBoxComponent, // descomentar si se desea solo habilitar la caja de texto 
    //TextMessageBoxFileComponent, // descomentar si se desea activar la caja de texto con subida de archivo
    TextMessageBoxSelectComponent, // descomentar si se desea tener la caja de texto y el select
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([{ text: 'Holaaaa', isGpt: false}]);
  public isLoading = signal(false);
  public openAiService = inject (OpenAiService);

  handleMessage( prompt: string){
    console.log({prompt});
  }

  handleMessageWithFile( {prompt, file }: TextMessageEvent){
    console.log({prompt, file });
  }

  handleMessageWithSelect( event: TextMessageBoxEvent){
    console.log(event);
  }
}
