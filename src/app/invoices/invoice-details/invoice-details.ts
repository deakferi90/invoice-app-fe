import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from '../invoice.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.scss',
})
export class InvoiceDetails {
  item!: Invoice;

  statusList = [
    {
      value: 'draft',
      textColor: '#373B53',
      backgroundColor: '#F0F0F5',
    },
    {
      value: 'pending',
      textColor: '#FF8F00',
      backgroundColor: '#FFF4E5',
    },
    {
      value: 'paid',
      textColor: '#33D69F',
      backgroundColor: '#E6F9F3',
    },
  ];

  constructor(private router: Router) {
    this.item = history.state.item;
  }

  getStatusStyle(status: string) {
    return this.statusList.find((item) => item.value === status);
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
