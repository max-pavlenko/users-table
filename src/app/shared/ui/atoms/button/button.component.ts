import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'ut-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() type: HTMLButtonElement['type'] = 'button';
}
