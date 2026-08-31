import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoice.state';

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoices');

export const selectInvoices = createSelector(selectInvoiceState, (state) => state.invoices);

export const selectLoading = createSelector(selectInvoiceState, (state) => state.loading);

export const selectError = createSelector(selectInvoiceState, (state) => state.error);
