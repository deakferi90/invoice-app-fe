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
}
