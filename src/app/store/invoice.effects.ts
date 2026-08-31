import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as InvoiceActions from './invoice.actions';
import { InvoiceService } from '../invoices/invoice';

@Injectable()
export class InvoiceEffects {
  private actions$ = inject(Actions);
  private invoiceService = inject(InvoiceService);

  laodInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),

      switchMap(() =>
        this.invoiceService.displayData().pipe(
          map((invoices) => InvoiceActions.loadInvoicesSuccess({ invoices })),

          catchError((error) =>
            of(
              InvoiceActions.loadInvoicesFailure({
                error: error.message,
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
