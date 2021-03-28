import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  public listPage: any[] = [];
  @Input() totalPage: number = 0;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 0;
  @Output() changePageIndex = new EventEmitter<any>();
  showLastBtn = false;
  showFirstBtn = false;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalPage']) {
      if (this.totalPage != 1) {
        this.renderListPage(this.totalPage, this.pageIndex);
      }
    }
    if (changes['pageIndex']) {
      this.listPage = [];
      if (this.totalPage != 1) {
        this.renderListPage(this.totalPage, this.pageIndex);
      }
    }
  }

  getByIndex(item: any) {
    this.changePageIndex.emit(item - 1);
  }

  renderListPage(total: number, page: number) {
    total = Math.ceil(total);
    page = Math.ceil(page);
    if (page >= 3 && total > 5) {
      this.showFirstBtn = true;
    } else {
      this.showFirstBtn = false;
    }
    if (page < total - 3 && total > 5) {
      this.showLastBtn = true;
    } else {
      this.showLastBtn = false;
    }

    this.listPage = [];
    const firstItem = page < 3 ? 0 : page - 2;
    const lastItem = page < 3 ? 5 : page + 5 < total ? page + 3 : total;
    for (let i = firstItem; i < lastItem; i++) {
      let item;
      item = { name: i + 1, status: i == page };
      this.listPage.push(item);
    }
  }
}
