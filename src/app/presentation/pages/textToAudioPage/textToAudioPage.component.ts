import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GptMessageComponent } from '@Components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMeesageComponent } from '@Components/chat-bubbles/myMeesage/myMeesage.component';
import { TextMessageBoxEvent, TextMessageBoxSelectComponent } from '@Components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@Components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio-page',
  standalone: true,
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMeesageComponent,
    TypingLoaderComponent,
    ReactiveFormsModule,
    TextMessageBoxSelectComponent
],
  templateUrl: './textToAudioPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject (OpenAiService);

  public voices = signal ([
    { id: "nova", text: "Nova" },
    { id: "alloy", text: "Alloy" },
    { id: "echo", text: "Echo" },
    { id: "fable", text: "Fable" },
    { id: "onyx", text: "Onyx" },
    { id: "shimmer", text: "Shimmer" },
  ]);

  handleMessageWithSelect( {prompt, selectedOption }: TextMessageBoxEvent){

    const message = `${ selectedOption } - ${ prompt }`;

    this.messages.update( prev => [...prev, { text: message, isGpt: false}] );
    this.isLoading.set(true);

    this.openAiService.textToAudio( prompt, selectedOption)
      .subscribe( ({ message, audioUrl }) => {
        this.isLoading.set(false);
        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: message,
            audioUrl: audioUrl,
          }
        ])
      })
  }
}
