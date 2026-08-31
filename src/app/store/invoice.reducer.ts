import { createReducer, on } from '@ngrx/store';
import {
  addInvoiceSuccess,
  deleteInvoiceSuccess,
  loadInvoices,
  loadInvoicesFailure,
  loadInvoicesSuccess,
  markAsPaidSuccess,
} from './invoice.actions';

import { InvoiceState, initialInvoiceState } from './invoice.state';

export const invoiceReducer = createReducer(
  initialInvoiceState,
  on(loadInvoices, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices,
    loading: false,
  })),

  on(loadInvoicesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(addInvoiceSuccess, (state, { invoice }) => ({
    ...state,
    invoices: [...state.invoices, invoice],
  })),

  on(deleteInvoiceSuccess, (state, { invoiceId }) => ({
    ...state,
    invoices: state.invoices.filter((invoice) => invoice.invoiceId !== invoiceId),
  })),

  on(markAsPaidSuccess, (state, { invoices }) => ({
    ...state,
    invoices: state.invoices.map((currentInvoice) =>
      currentInvoice.invoiceId === invoices.invoiceId ? invoices : currentInvoice,
    ),
  })),
);
