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

  getInvoice(invoiceId: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${invoiceId}`);
  }

  deleteInvoice(invoiceId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${invoiceId}`);
  }

  updateInvoiceStatus(invoiceId: string, status: 'draft' | 'pending' | 'paid') {
    return this.http.patch(`${this.apiUrl}/${invoiceId}`, { status });
  }

  markAsPaid(invoiceId: string): Observable<Invoice> {
    return this.http.patch<Invoice>(`${this.apiUrl}/${invoiceId}/pay`, {});
  }
}
