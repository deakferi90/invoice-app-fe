import { createAction, props } from '@ngrx/store';
import { Invoice } from '../invoices/invoice.interface';

export const loadInvoices = createAction('[Invoice] Load Invoices');

export const loadInvoicesSuccess = createAction(
  '[Invoice] Load Invoices Success',
  props<{ invoices: Invoice[] }>(),
);

export const loadInvoicesFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: string }>(),
);

export const addInvoice = createAction('[Invoice] Add Invoice', props<{ invoice: Invoice }>());

export const addInvoiceSuccess = createAction(
  '[Invoice] Add Invoice Success',
  props<{ invoice: Invoice }>(),
);

export const addInvoiceFailure = createAction(
  '[Invoice] Add Invoice Failure',
  props<{ error: string }>(),
);

export const deleteInvoice = createAction(
  '[Invoice] Delete Invoice',
  props<{ invoiceId: string }>(),
);

export const deleteInvoiceSuccess = createAction(
  '[Invoice] Delete Invoice Success',
  props<{ invoiceId: string }>(),
);

export const deleteInvoiceFailure = createAction(
  '[Invoice] Delete Invoice Failure',
  props<{ error: string }>(),
);

export const markAsPaid = createAction('[Invoice] Mark As Paid', props<{ invoiceId: string }>());

export const markAsPaidSuccess = createAction(
  '[Invoice] Mark As Paid Success',
  props<{ invoices: Invoice }>(),
);

export const markAsPaidFailure = createAction(
  '[Invoice] Mark As Paid Failure',
  props<{ error: string }>(),
);
