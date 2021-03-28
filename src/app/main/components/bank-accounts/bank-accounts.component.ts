import { Component, OnInit, ViewChild } from '@angular/core';
import {
  concatAll,
  concatMap,
  filter,
  map,
  mergeAll,
  mergeMap,
  switchAll,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { createParamSearch, Account } from 'src/app/core/model/account.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColumnTableModel } from 'src/app/core/model/column-table.model';
import { AccountService } from 'src/app/core/services/account.service';
import { FormBankAccountComponent } from '../share/form-bank-account/form-bank-account.component';
import { NotifyService } from 'src/app/core/services/notify.service';
import { of } from 'rxjs';
import { Accounts } from 'src/app/core/data/account';
import { PaginationComponent } from '../share/pagination/pagination.component';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.scss'],
})
export class BankAccountsComponent implements OnInit {
  @ViewChild('pagination', { static: false })
  pagination: PaginationComponent = new PaginationComponent();
  bankAccounts: Account[] = [];
  totalPage: number = 0;
  pageIndex: number = 0;
  pageSize: number = 25;
  listColumns: ColumnTableModel[] = [
    {
      field: '_id',
      name: 'Id',
      classTd: 'd-none',
      classTh: 'd-none',
      width: '300px',
    },
    {
      field: 'account_number',
      name: 'Account Number',
      width: '100px',
      classTd: 'text-right',
      hideInputSearch: true,
    },
    {
      field: 'firstname',
      name: 'First Name',
      width: '140px',
    },
    {
      field: 'lastname',
      name: 'Last Name',
      width: '140px',
    },
    {
      field: 'gender',
      name: 'Gender',
      width: '100px',
      classTd: 'text-center',
    },
    {
      field: 'balance',
      width: '80px',
      name: 'Balance',
      hideInputSearch: true,
      classTd: 'text-right',
    },

    {
      field: 'email',
      name: 'Email',
      width: '240px',
    },
  ];
  allBankAccount: Account[] = [];

  constructor(
    private accountService: AccountService,
    private ngbModal: NgbModal,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    this.getAccounts(this.pageIndex);
  }
  changePageIndex(index: any) {
    this.getAccounts(index);
  }

  onSearch(data: any) {
    let params: any = {
      start: 0,
      limit: 1000,
    };

    // if else xử lý 1 số trường hợp tên field không trùng với ParamSearch
    let value = data.value.trim();
    if (data.field == 'firstname') {
      params['first_name'] = value;
    } else if (data.field == 'lastname') {
      params['last_name'] = value;
    } else {
      params[data.field] = value;
    }
    this.getAccounts(this.pageIndex, params);
  }

  onDelete(id: any) {
    let account = this.bankAccounts.find((x) => x._id == id);
    if (account != null && account != undefined) {
      this.accountService.deleteAccount(account).subscribe((response) => {
        this.getAccounts(this.pageIndex);
        this.notify.showNotification('success', 'Deleted');
      });
    }
  }

  onEdit(id: any) {
    let account = this.bankAccounts.find((x) => x._id == id);
    var modal = this.ngbModal.open(FormBankAccountComponent, {
      size: 'lg',
      centered: false,
      backdrop: 'static',
      keyboard: true,
      backdropClass: 'modal-backdrop',
    });
    modal.componentInstance.isEditForm = true;
    modal.componentInstance.accountData = account;
    modal.componentInstance.allBankAccount = this.allBankAccount;
    modal.componentInstance.onSubmitModal = () =>
      this.getAccounts(this.pageIndex);
  }

  sortByField(field: string) {}

  getAccounts(pageIndex: number, param?: any) {
    if (param == null || param == undefined) {
      param = {
        last_name: '',
        start: 0,
        limit: 1000,
      };
    }
    let params = createParamSearch(param);
    this.accountService
      .getAccounts(params)
      .pipe(
        tap((res) => {
          this.totalPage = res.length / this.pageSize;
          this.pageIndex = pageIndex;
        })
      )
      .subscribe((res) => {
        let firstItem = pageIndex * this.pageSize;
        let arr = res.splice(firstItem, this.pageSize);
        this.bankAccounts = arr;
        this.allBankAccount = res.concat(arr);
      });
  }

  openModalBankAcc() {
    let modal = this.ngbModal.open(FormBankAccountComponent, {
      size: 'lg',
      centered: false,
      backdrop: 'static',
      keyboard: true,
      backdropClass: 'modal-backdrop',
    });
    modal.componentInstance.allBankAccount = this.allBankAccount;
  }
}
