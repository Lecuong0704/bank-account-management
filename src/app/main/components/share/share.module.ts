import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyTableComponent } from './my-table/my-table.component';
import { FormBankAccountComponent } from './form-bank-account/form-bank-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    MyTableComponent,
    FormBankAccountComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [MyTableComponent, PaginationComponent],
  entryComponents: [
    MyTableComponent,
    FormBankAccountComponent,
    PaginationComponent,
  ],
})
export class ShareModule {}
