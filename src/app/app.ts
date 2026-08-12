import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Leftside } from './leftside/leftside';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Leftside],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('invoice-app-fe');
}
