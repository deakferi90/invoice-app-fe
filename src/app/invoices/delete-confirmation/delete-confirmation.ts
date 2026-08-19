import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InvoiceService } from '../invoice';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-confirmation',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './delete-confirmation.html',
  styleUrl: './delete-confirmation.scss',
})
export class DeleteConfirmation {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmation>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private invoiceService: InvoiceService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    this.invoiceService.deleteInvoice(this.data.invoiceId).subscribe({
      next: (response) => {
        console.log('Invoice deleted:', response);

        this.toastr.success('Invoice deleted successfully');

        this.dialogRef.close(true);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toastr.error(`Invoice can't be deleted`);
        this.dialogRef.close(true);
        console.error('Error deleting invoice:', error);
      },
    });
  }
}
