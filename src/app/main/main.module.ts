import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountsComponent } from './components/bank-accounts/bank-accounts.component';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main-routing.module';
import { ShareModule } from './components/share/share.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainComponent, BankAccountsComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ShareModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class MainModule {}
