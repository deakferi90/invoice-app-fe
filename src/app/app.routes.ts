import { Routes } from '@angular/router';
import { Invoices } from './invoices/invoices';
import { InvoiceDetails } from './invoices/invoice-details/invoice-details';

export const routes: Routes = [
  {
    path: '',
    component: Invoices,
  },
  {
    path: 'invoice/:id',
    component: InvoiceDetails,
  },
];
