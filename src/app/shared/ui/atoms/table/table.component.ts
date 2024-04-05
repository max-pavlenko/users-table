import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {JsonPipe, NgClass, NgStyle, NgTemplateOutlet} from '@angular/common';
import {Unique} from '../../../types/utils';
import {CellContext, Column} from './table';

@Component({
  selector: 'ut-table',
  standalone: true,
  imports: [
    NgStyle,
    NgTemplateOutlet,
    JsonPipe,
    NgClass
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent<T extends Unique> {
  @Input({required: true}) set columns(value: Column<T>[]) {
    this._columns = value;
    this.columnWidths = this.evenCellWidths;
  }
  _columns: Column<T>[] = [];
  protected columnWidths = this.evenCellWidths;

  @Input({required: true}) data: T[] = [];
  @Input() cellTemplate?: TemplateRef<CellContext<T>>;
  @Input() selectedItem?: T;
  @Output() rowClicked = new EventEmitter<{ current: T, previous: T | undefined }>();

  isRowSelected(row: T) {
    return row.id === this.selectedItem?.id;
  }

  get evenCellWidths() {
    return this._columns.map(() => `${1 / (this._columns.length || 1) * 100}%`);
  }

  areRowsClickable() {
    return this.rowClicked.observed;
  }

  onSelectedRow(item: T) {
    this.rowClicked.emit({current: item, previous: this.selectedItem});
    this.selectedItem = item.id === this.selectedItem?.id ? undefined : item;
  }
}
