import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice';
import { Invoice } from './invoice.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoices',
  imports: [DatePipe],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices implements OnInit {
  items: Invoice[] = [];
  constructor(private invoice: InvoiceService) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.invoice.displayData().subscribe({
      next: (data) => {
        this.items = data;
        console.log(this.items);
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      },
    });
  }
}
