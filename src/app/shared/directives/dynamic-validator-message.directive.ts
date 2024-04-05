import {ChangeDetectorRef, ComponentRef, DestroyRef, Directive, ElementRef, inject, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {EMPTY, fromEvent, merge, startWith} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {ErrorComponent} from '../ui/atoms/error/error.component';
import {ErrorMatcher} from '../services/error-matcher.service';

@Directive({
  selector: '[utDynamicValidatorMessage]',
  standalone: true,
  exportAs: 'utDynamicValidatorMessage',
})
export class DynamicValidatorMessageDirective implements OnInit {
  @Input({required: true}) controlKey = '';
  @Input() errorData?: Record<string, unknown>;
  componentRef: ComponentRef<ErrorComponent> | null = null;
  errorMatcher = inject(ErrorMatcher);

  constructor(private vcr: ViewContainerRef, private dr: DestroyRef, private el: ElementRef,
              private controlContainer: ControlContainer, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    queueMicrotask(() => {
      this.watchControl();
    });
  }

  private watchControl() {
    const nativeEl = this.el.nativeElement;
    merge(
      this.control.statusChanges.pipe(startWith(this.control.status),),
      nativeEl.querySelector ? fromEvent(nativeEl.querySelector(`#${this.controlKey}`), 'blur') : EMPTY,
    )
      .pipe(takeUntilDestroyed(this.dr))
      .subscribe(() => {
        if (this.errorMatcher.match({control: this.control})) {
          this.createError();
        } else {
          this.destroyError();
        }
        this.cd.markForCheck();
      });
  }

  get control() {
    return (this.controlContainer.control as FormGroup).controls[this.controlKey];
  }

  createError() {
    this.componentRef ??= this.vcr.createComponent(ErrorComponent);
    this.componentRef.setInput('errors', this.control.errors);
    this.componentRef.setInput('errorData', this?.errorData);
  }

  destroyError() {
    this.componentRef?.destroy();
    this.componentRef = null;
  }
}
