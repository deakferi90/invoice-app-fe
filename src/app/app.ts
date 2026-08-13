import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Leftside } from './leftside/leftside';
import { Invoices } from './invoices/invoices';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Leftside, Invoices],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('invoice-app-fe');
}
