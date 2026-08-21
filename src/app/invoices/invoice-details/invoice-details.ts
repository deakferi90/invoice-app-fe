import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { Invoice } from '../invoice.interface';
import { InvoiceService } from '../invoice';
import { DeleteConfirmation } from '../delete-confirmation/delete-confirmation';

@Component({
  selector: 'app-invoice-details',
  imports: [CommonModule],
  templateUrl: './invoice-details.html',
  styleUrl: './invoice-details.scss',
})
export class InvoiceDetails implements OnInit {
  item: Invoice | null = null;

  // Status colors
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

  // Get the colors based on the current invoice status
  get statusStyle() {
    const style = this.statusList.find((status) => status.value === this.item?.status);

    return {
      textColor: style?.textColor ?? '',
      backgroundColor: style?.backgroundColor ?? '',
    };
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private invoiceService: InvoiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const invoiceId = this.route.snapshot.paramMap.get('id');

    console.log('Invoice ID from URL:', invoiceId);

    if (!invoiceId) {
      console.error('No invoice ID found in URL');
      return;
    }

    this.invoiceService.getInvoice(invoiceId).subscribe({
      next: (invoice) => {
        console.log('Invoice loaded from backend:', invoice);

        this.item = invoice;
        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('Error loading invoice:', error);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  deleteInvoice(invoiceId: string): void {
    this.dialog.open(DeleteConfirmation, {
      height: '250px',
      width: '480px',
      data: {
        invoiceId,
      },
    });
  }

  markAsPaid(): void {
    const invoiceId = this.route.snapshot.paramMap.get('id');

    if (!invoiceId) {
      return;
    }

    this.invoiceService.markAsPaid(invoiceId).subscribe({
      next: (invoice) => {
        console.log('Updated invoice from backend:', invoice);

        this.item = invoice;

        this.cdr.detectChanges();

        this.toastr.success('Invoice marked as paid');
      },

      error: (error) => {
        console.error('Error updating invoice:', error);

        this.toastr.error('Failed to update invoice', 'Error');
      },
    });
  }
}
