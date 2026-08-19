import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from './invoice.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:5000/api/invoices';

  displayData(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.apiUrl);
  }

  deleteInvoice(invoiceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${invoiceId}`);
  }

  updateInvoiceStatus(invoiceId: string, status: 'draft' | 'pending' | 'paid') {
    return this.http.patch(`http://localhost:5000/api/invoices/${invoiceId}`, { status });
  }

  markAsPaid(invoiceId: string) {
    return this.http.patch<Invoice>(`http://localhost:5000/api/invoices/${invoiceId}/pay`, {});
  }
}
