import { Component, OnInit } from '@angular/core';
import { InvoiceService } from './invoice';
import { Invoice } from './invoice.interface';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-invoices',
  standalone: true,
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices implements OnInit {
  items: Invoice[] = [];
  constructor(
    private invoice: InvoiceService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.invoice.displayData().subscribe({
      next: (data) => {
        this.items = data;

        this.cdr.detectChanges();

        console.log(this.items);
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      },
    });
  }
}
