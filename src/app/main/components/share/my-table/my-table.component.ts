import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ColumnTableModel } from 'src/app/core/model/column-table.model';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss'],
})
export class MyTableComponent implements OnInit {
  @Input() columns: ColumnTableModel[] = [];
  @Input() isLoading: boolean = false;
  @Input() rows: any[] = [];
  @Input() totalRows: number = 0;
  @Output() onSearch = new EventEmitter<any>();
  @Output() sortByField = new EventEmitter<any>();
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();

  public data: any[] = [];
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['rows']) {
      this.prepareTableData();
    }
  }

  prepareTableData() {
    this.data = this.rows.map((row) => {
      let item: any = {};
      for (const key in row) {
        if (this.columns.some((x) => x.field == key)) {
          item[key] = row[key];
        }
      }
      return item;
    });
  }

  _onEdit(id: any) {
    this.onEdit.emit(id);
  }

  _onDelete(id: any) {
    this.onDelete.emit(id);
  }

  _sortByField(field: any) {
    this.sortByField.emit(field);
  }

  inputSearchOnkeyup(field: any, e: any) {
    var inputs = document.getElementsByClassName('input-search');
    for (var i = 0; i < inputs.length; i += 1) {
      if (inputs[i].id != field) {
        (<HTMLInputElement>inputs[i]).value = '';
      }
    }
    let value = e.target.value;
    this.onSearch.emit({ field: field, value: value });
  }
}
