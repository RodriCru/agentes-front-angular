import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Message } from '@interfaces/message.interface';
import { OpenAiService } from 'app/presentation/services/openai.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GptMessageComponent } from '@Components/chat-bubbles/gptMessage/gptMessage.component';
import { MyMeesageComponent } from '@Components/chat-bubbles/myMeesage/myMeesage.component';
import { TextMessageBoxComponent } from '@Components/text-boxes/textMessageBox/textMessageBox.component';
import { TypingLoaderComponent } from '@Components/typingLoader/typingLoader.component';
import { GptMessageEditableImageComponent } from '@Components/chat-bubbles/gptMessageEditableImage/gptMessageEditableImage.component';

@Component({
  selector: 'app-image-tunning-page',
  imports: [
    CommonModule,
    GptMessageComponent,
    MyMeesageComponent,
    TypingLoaderComponent,
    ReactiveFormsModule,
    TextMessageBoxComponent,
    GptMessageEditableImageComponent,
  ],
  templateUrl: './imageTunningPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ImageTunningPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject (OpenAiService);

  public originalImage = signal<string|undefined>(undefined);


  handleMessage( prompt: string){
    this.isLoading.set(true);
    this.messages.update( prev => [ ...prev, { isGpt: false, text: prompt}] );

    this.openAiService.imageGeneration( prompt)
      .subscribe( resp => {
        this.isLoading.set(false);
        if ( !resp ) return;

        this.messages.update(prev => [
          ...prev,
          {
            isGpt: true,
            text: 'Imagen generada a corde al prompt.',
            imageInfo: resp,
          }
        ]);

      })
  }

  handleImageChange(newImage: string, originalImage: string ){
    this.originalImage.set(originalImage);
    // Tdo: mask

    console.log({ newImage, originalImage })
  }
  generatedVariation(){
    this.isLoading.set(true);
    this.openAiService.imageVariation( this.originalImage()! )
      .subscribe( resp =>{
        this.isLoading.set(false);
        if(!resp) return ;

        this.messages.update( prev => [
          ...prev,
          {
            isGpt: true,
            text: 'Imagen con variación',
            imageInfo: resp
          }
        ]);
        
      })
  }
}
