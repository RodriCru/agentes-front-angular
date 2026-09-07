/**
 * Paso 3, Mandar a llamar el service y pasandole los parámetros y obtieniendo los parametros para mostrar en el .HTML
 */
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GptMessageComponent } from '@Components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMeesageComponent } from '@Components/chat-bubbles/myMeesage/myMeesage.component';
import { TextMessageBoxComponent } from '@Components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@Components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-page',
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMeesageComponent,
    TypingLoaderComponent,
    ReactiveFormsModule,
    TextMessageBoxComponent
  ],
  templateUrl: './prosConsPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject (OpenAiService);

  handleMessage( prompt: string){

    this.messages.update( (prev) => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      }
    ]);

    this.isLoading.set(true);
    this.openAiService.prosConsDiscusser(prompt)
      .subscribe( resp => {
        this.isLoading.set(false);

        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: resp.content
          }
        ]);

      })
  }
}
