import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule, MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSidenavModule } from '@angular/material/sidenav';

import { Invoice } from './invoice.interface';

import { loadInvoices } from '../store/invoice.actions';
import { selectInvoices } from '../store/invoice.selectors';
import { combineLatest, map, startWith } from 'rxjs';
import { NewInvoiceComponent } from './new-invoice/new-invoice';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [
    DatePipe,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    CommonModule,
    NewInvoiceComponent,
  ],
  templateUrl: './invoices.html',
  styleUrl: './invoices.scss',
})
export class Invoices implements OnInit {
  @ViewChild(MatSelect) matSelect!: MatSelect;

  protected store = inject(Store);

  selectedStatuses = new FormControl<string[]>([], {
    nonNullable: true,
  });

  invoices$ = this.store.select(selectInvoices);

  filteredInvoices$ = combineLatest([
    this.invoices$,
    this.selectedStatuses.valueChanges.pipe(startWith(this.selectedStatuses.value)),
  ]).pipe(
    map(([invoices, statuses]) => {
      if (statuses.length === 0) {
        return invoices;
      }

      return invoices.filter((invoice) => statuses.includes(invoice.status));
    }),
  );

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(loadInvoices());

    this.selectedStatuses.valueChanges.subscribe(() => {
      this.matSelect?.close();
    });
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
}
