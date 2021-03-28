import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account } from 'src/app/core/model/account.model';
import { AccountService } from 'src/app/core/services/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotifyService } from 'src/app/core/services/notify.service';
import { ValidateHelper } from 'src/app/core/helpers/validate-helper';

@Component({
  selector: 'app-form-bank-account',
  templateUrl: './form-bank-account.component.html',
  styleUrls: ['./form-bank-account.component.scss'],
})
export class FormBankAccountComponent implements OnInit {
  isEditForm = false;
  onSubmitModal: () => void = () => {};
  allBankAccount: Account[] = [];
  listEmail: string[] = [];
  listAccountNumber: string[] = [];

  accountData: Account = {
    _id: '',
    account_number: '',
    balance: 0,
    firstname: '',
    lastname: '',
    address: '',
    employer: '',
    email: '',
    city: '',
    state: '',
    gender: '',
    age: 0,
  };

  formAccount = new FormGroup({
    _id: new FormControl(''),
    account_number: new FormControl(0, Validators.required),
    balance: new FormControl(0, Validators.required),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    employer: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
  });
  constructor(
    private accountService: AccountService,
    private ngbModal: NgbModal,
    private notify: NotifyService
  ) {}

  ngOnInit(): void {
    if (this.isEditForm) {
      this.renderValue();
    }
    this.listEmail = this.allBankAccount.map((x) => {
      if (x.email != this.accountData.email) {
        return x.email;
      }
      return '';
    });
    this.listAccountNumber = this.allBankAccount.map((x) => {
      if (x.account_number != this.accountData.account_number) {
        return x.account_number;
      }
      return '';
    });
  }

  renderValue() {
    this.formAccount.patchValue({
      _id: this.accountData._id,
      account_number: this.accountData.account_number,
      balance: this.accountData.balance,
      firstname: this.accountData.firstname,
      lastname: this.accountData.lastname,
      address: this.accountData.address,
      employer: this.accountData.employer,
      email: this.accountData.email,
      city: this.accountData.city,
      state: this.accountData.state,
      gender: this.accountData.gender,
      age: this.accountData.age,
    });
  }

  onEdit() {
    var acc = this.formAccount.value;
    if (!this.formIsValid()) {
      return;
    }
    this.accountService.editAccount(acc).subscribe((response) => {
      this.closeModal();
      this.onSubmitModal();
      this.notify.showNotification('success', 'Success');
    });
  }

  formIsValid(): boolean {
    let form = this.formAccount;
    if (!form.valid) {
      this.notify.showNotification(
        'warning',
        'Bạn cần điền đủ các trường trên form'
      );
      return false;
    }
    if (!ValidateHelper.validateEmail(form.value?.email)) {
      this.notify.showNotification('warning', 'Email invalid');
      return false;
    }
    if (form.value?.age <= 0) {
      this.notify.showNotification('warning', 'Age invalid!');
      return false;
    }
    if (form.value?.balance <= 0) {
      this.notify.showNotification('warning', 'Balance invalid!');
      return false;
    }
    if (this.listEmail.some((x) => x == form.value.email.trim())) {
      this.notify.showNotification('warning', 'Email already exists!');
      return false;
    }
    if (this.listAccountNumber.some((x) => x == form.value.account_number)) {
      this.notify.showNotification('warning', 'Account number already exists!');
      return false;
    }
    return true;
  }

  onSubmit() {
    var acc = this.formAccount.value;
    this.accountService.addAccount(acc).subscribe((response) => {
      this.closeModal();
      this.onSubmitModal();
    });
  }

  closeModal() {
    this.ngbModal.dismissAll(FormBankAccountComponent);
  }
}
