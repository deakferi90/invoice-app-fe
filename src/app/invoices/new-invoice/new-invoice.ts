import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Address {
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface Client {
  name: string;
  email: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
}

interface InvoiceItem {
  name: string;
  quantity: number;
  price: number;
  total: number;
  priceError?: boolean;
}

interface Invoice {
  billTo: Address;
  client: Client;
  issueDate: Date;
  paymentTerms: string;
  items: InvoiceItem[];
}

interface CalendarDay {
  date: number;
  month: number;
  year: number;
  otherMonth: boolean;
}

@Component({
  selector: 'app-new-invoice',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-invoice.html',
  styleUrls: ['./new-invoice.scss'],
})
export class NewInvoiceComponent implements OnInit {
  isDatePickerOpen = false;

  showError = false;

  invoice: Invoice = {
    billTo: {
      street: '19 Union Terrace',
      city: 'London',
      postCode: 'E1 3EZ',
      country: 'United Kingdom',
    },

    client: {
      name: 'Alex Grim',
      email: 'alexgrim@mail.com',
      street: '84 Church Way',
      city: 'Bradford',
      postCode: 'BD1 9PB',
      country: 'United Kingdom',
    },

    issueDate: new Date(2021, 7, 21),

    paymentTerms: '30',

    items: [
      {
        name: 'Brand Design',
        quantity: 1,
        price: 156,
        total: 156,
      },
      {
        name: 'Email Design',
        quantity: 2,
        price: 0,
        total: 0,
      },
    ],
  };

  paymentTerms = [
    { label: 'Net 30 Days', value: '30' },
    { label: 'Net 14 Days', value: '14' },
    { label: 'Net 7 Days', value: '7' },
    { label: 'Due on Receipt', value: '0' },
  ];

  monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  calendarMonth = 7;
  calendarYear = 2021;

  calendarDays: CalendarDay[] = [];

  ngOnInit(): void {
    this.calendarMonth = this.invoice.issueDate.getMonth();
    this.calendarYear = this.invoice.issueDate.getFullYear();

    this.generateCalendar();
    this.calculateAllItems();
  }

  /* ==================== DATE ==================== */

  get formattedIssueDate(): string {
    const date = this.invoice.issueDate;

    return `${date.getDate()} ${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }

  toggleDatePicker(): void {
    this.isDatePickerOpen = !this.isDatePickerOpen;

    if (this.isDatePickerOpen) {
      this.calendarMonth = this.invoice.issueDate.getMonth();
      this.calendarYear = this.invoice.issueDate.getFullYear();

      this.generateCalendar();
    }
  }

  generateCalendar(): void {
    this.calendarDays = [];

    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1);

    const daysInMonth = new Date(this.calendarYear, this.calendarMonth + 1, 0).getDate();

    let startDay = firstDay.getDay();

    // Monday = 0
    startDay = startDay === 0 ? 6 : startDay - 1;

    // Previous month

    const previousMonthDays = new Date(this.calendarYear, this.calendarMonth, 0).getDate();

    for (let i = startDay - 1; i >= 0; i--) {
      this.calendarDays.push({
        date: previousMonthDays - i,
        month: this.calendarMonth - 1,
        year: this.calendarMonth === 0 ? this.calendarYear - 1 : this.calendarYear,
        otherMonth: true,
      });
    }

    // Current month

    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push({
        date: day,
        month: this.calendarMonth,
        year: this.calendarYear,
        otherMonth: false,
      });
    }

    // Next month

    let nextDay = 1;

    while (this.calendarDays.length < 35) {
      this.calendarDays.push({
        date: nextDay++,
        month: this.calendarMonth + 1,
        year: this.calendarMonth === 11 ? this.calendarYear + 1 : this.calendarYear,
        otherMonth: true,
      });
    }
  }

  previousMonth(): void {
    this.calendarMonth--;

    if (this.calendarMonth < 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    }

    this.generateCalendar();
  }

  nextMonth(): void {
    this.calendarMonth++;

    if (this.calendarMonth > 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    }

    this.generateCalendar();
  }

  selectDate(day: CalendarDay): void {
    if (day.otherMonth) {
      return;
    }

    this.invoice.issueDate = new Date(day.year, day.month, day.date);

    this.isDatePickerOpen = false;
  }

  isSelectedDate(day: CalendarDay): boolean {
    const selected = this.invoice.issueDate;

    return (
      selected.getDate() === day.date &&
      selected.getMonth() === day.month &&
      selected.getFullYear() === day.year &&
      !day.otherMonth
    );
  }

  /* ==================== ITEMS ==================== */

  calculateItem(item: InvoiceItem): void {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;

    item.priceError = price < 0;

    item.total = item.priceError ? 0 : quantity * price;
  }

  calculateAllItems(): void {
    this.invoice.items.forEach((item) => {
      this.calculateItem(item);
    });
  }

  addItem(): void {
    this.invoice.items.push({
      name: '',
      quantity: 1,
      price: 0,
      total: 0,
    });

    this.showError = false;
  }

  removeItem(index: number): void {
    if (this.invoice.items.length <= 1) {
      return;
    }

    this.invoice.items.splice(index, 1);
  }

  formatCurrency(value: number): string {
    return value.toFixed(2);
  }

  /* ==================== VALIDATION ==================== */

  validateInvoice(): boolean {
    const billTo = this.invoice.billTo;
    const client = this.invoice.client;

    if (!billTo.street || !billTo.city || !billTo.postCode || !billTo.country) {
      return false;
    }

    if (
      !client.name ||
      !client.email ||
      !client.street ||
      !client.city ||
      !client.postCode ||
      !client.country
    ) {
      return false;
    }

    if (!this.invoice.items.length) {
      return false;
    }

    return this.invoice.items.every((item) => !!item.name && item.quantity > 0 && item.price >= 0);
  }

  /* ==================== ACTIONS ==================== */

  saveInvoice(): void {
    if (!this.validateInvoice()) {
      this.showError = true;

      return;
    }

    this.showError = false;

    console.log('Save & Send:', this.invoice);
  }

  saveAsDraft(): void {
    console.log('Save as Draft:', this.invoice);
  }

  discardInvoice(): void {
    console.log('Discard invoice');
  }
}
