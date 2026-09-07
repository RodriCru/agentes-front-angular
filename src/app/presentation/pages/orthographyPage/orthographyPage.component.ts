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
import { GptMessageOrthographyComponent } from "@Components/chat-bubbles/gptMessageOrthography/gptMessageOrthography.component";

@Component({
  selector: 'app-orthography-page',
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMeesageComponent,
    TypingLoaderComponent,
    GptMessageComponent,
    //Obligatoriamente se descomenta una las otras dos deben de comentarse
    TextMessageBoxComponent,
    GptMessageOrthographyComponent
],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject (OpenAiService);

  handleMessage( prompt: string){
    // console.log({prompt});
    this.isLoading.set(true);

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.openAiService.checkOrthography(prompt)
      .subscribe( resp => {
        this.isLoading.set(false);
        console.log(resp);
        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.message,
            info: resp,
          }
        ])
      })
  }

  //handleMessageWithFile( {prompt, file }: TextMessageEvent){
  //  console.log({prompt, file });
  //}

  //handleMessageWithSelect( event: TextMessageBoxEvent){
  //  console.log(event);
  //}
}
