import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-meesage',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './myMeesage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyMeesageComponent {
  @Input({ required: true }) text!: string;
}
