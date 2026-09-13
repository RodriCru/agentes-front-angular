import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GptMessageComponent } from '@Components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMeesageComponent } from '@Components/chat-bubbles/myMeesage/myMeesage.component';
import { TextMessageEvent, TextMessageBoxFileComponent } from '@Components/text-boxes/textMessageBoxFile/textMessageBoxFile.components';
import { TypingLoaderComponent } from '@Components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { AudioToTextResponse } from '@interfaces/audio-to-text.response';

@Component({
  selector: 'app-audio-to-text-page',
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMeesageComponent,
    TypingLoaderComponent,
    ReactiveFormsModule,
    TextMessageBoxFileComponent
],
  templateUrl: './audioToTextPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToTextPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject (OpenAiService);

  handleMessageWithFile( {prompt, file }: TextMessageEvent){
    //console.log({prompt, file });
    const text = prompt ?? file.name ?? 'Tradice el audio';
    this.isLoading.set(true);

    this.messages.update( prev => [...prev, { isGpt: false, text: text }]);

    this.openAiService.audioToText( file, text)
      .subscribe( resp => this.handleResponse(resp));

  }
  
  handleResponse (resp: AudioToTextResponse | null){
    this.isLoading.set(false);
    if( !resp ) return;

    const text = `## Transcripción:
__Duración:__ ${ Math.round( resp.duration )} segundos.

## El texto es:
${ resp.text }
    `;
    this.messages.update( prev => [...prev, { isGpt: true, text: text }]);

    for ( const segment of resp.segments ){
      const segmentMessage = `
__De ${ Math.round(segment.start) } a ${ Math.round( segment.end ) } segundos.__
${ segment.text }
      `;
    this.messages.update( prev => [...prev, { isGpt: true, text: segmentMessage }]);

    }
  }
}
