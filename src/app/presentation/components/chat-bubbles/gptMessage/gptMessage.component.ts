import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MarkdownComponent, MarkdownModule } from "ngx-markdown";

@Component({
  selector: 'app-gpt-message',
  standalone: true,
  imports: [
    CommonModule,
    MarkdownComponent,
    MarkdownModule,
],
  templateUrl: './gptMessage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GptMessageComponent {
  @Input({ required: true }) text!: string;

  @Input() audioUrl?: string;

  @Input() imageInfo?: { url: string, alt?: string };
  
}
