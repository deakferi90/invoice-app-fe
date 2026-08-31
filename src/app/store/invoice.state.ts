import { Invoice } from '../invoices/invoice.interface';

export interface InvoiceState {
  invoices: Invoice[];
  loading: boolean;
  error: string | null;
}

export const initialInvoiceState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};
