import {ChangeDetectionStrategy, Component, HostBinding, Input} from '@angular/core';

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

  @HostBinding('class.disabled') get isDisabled() {
    return this.disabled;
  }
}
