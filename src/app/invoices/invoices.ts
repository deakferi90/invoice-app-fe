import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { InvoiceService } from './invoice';
import { Invoice } from './invoice.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [DatePipe, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices implements OnInit {
  @ViewChild(MatSelect) matSelect!: MatSelect;
  items: Invoice[] = [];
  filteredItems: Invoice[] = [];

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

  selectedStatuses = new FormControl<string[]>([], {
    nonNullable: true,
  });

  constructor(
    private invoiceService: InvoiceService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.getData();

    this.selectedStatuses.valueChanges.subscribe((statuses) => {
      this.filterInvoices(statuses);
      this.matSelect.close();
    });
  }

  filterInvoices(statuses: string[]): void {
    if (statuses.length === 0) {
      this.filteredItems = this.items;
      return;
    }

    this.filteredItems = this.items.filter((invoice) => statuses.includes(invoice.status));
  }

  getStatus(status: string) {
    return this.statusList.find((item) => item.value === status);
  }

  getStatusStyle(status: string) {
    const statusItem = this.statusList.find((item) => item.value === status);

    return {
      color: statusItem?.textColor ?? '',
      backgroundColor: statusItem?.backgroundColor ?? '',
    };
  }

  redirectToDetails(item: Invoice) {
    this.router.navigate(['/invoice', item.invoiceId], {
      state: { item },
    });
  }

  getData(): void {
    this.invoiceService.displayData().subscribe({
      next: (data) => {
        this.items = data;
        this.filteredItems = data;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      },
    });
  }

  // markAsPaid(invoiceId: string): void {
  //   const invoice = this.items.find((item) => item.invoiceId === invoiceId);

  //   if (!invoice || (invoice.status !== 'pending' && invoice.status !== 'draft')) {
  //     return;
  //   }

  //   this.invoiceService.markAsPaid(invoiceId).subscribe({
  //     next: () => {
  //       if (!invoice || (invoice.status !== 'pending' && invoice.status !== 'draft')) {
  //         return;
  //       }
  //       invoice.status = 'paid';

  //       this.toastr.success('Invoice marked as paid');
  //     },
  //     error: (error: any) => {
  //       console.error('Error updating invoice:', error);

  //       this.toastr.error('Failed to update invoice', 'Error');
  //     },
  //   });
  // }
}
