import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ut-not-authorized',
  standalone: true,
  imports: [],
  templateUrl: './not-authorized.component.html',
  styleUrl: './not-authorized.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class NotAuthorizedComponent {

}
