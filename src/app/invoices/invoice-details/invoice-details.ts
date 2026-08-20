import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Invoice } from '../invoice.interface';
import { CommonModule } from '@angular/common';
import { InvoiceService } from '../invoice';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmation } from '../delete-confirmation/delete-confirmation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.scss',
})
export class InvoiceDetails {
  item!: Invoice;

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

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {
    this.item = history.state.item;
  }

  getStatusStyle(status: string) {
    return this.statusList.find((item) => item.value === status);
  }
  goBack() {
    this.router.navigate(['/']);
  }

  deleteInvoice(invoiceId: string): void {
    this.dialog.open(DeleteConfirmation, {
      height: '250px',
      width: '480px',
      data: {
        invoiceId: invoiceId,
      },
    });
  }

  markAsPaid(): void {
    if (this.item.status !== 'pending' && this.item.status !== 'draft') {
      return;
    }

    this.invoiceService.markAsPaid(this.item.invoiceId).subscribe({
      next: (updatedInvoice) => {
        this.item = updatedInvoice;
        this.cdr.detectChanges();
        //this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error updating invoice:', error);
      },
    });
  }
}
