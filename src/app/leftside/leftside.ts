import { Component, inject } from '@angular/core';
import { ThemeService } from '../services/theme';

@Component({
  selector: 'app-leftside',
  standalone: true,
  imports: [],
  templateUrl: './leftside.html',
  styleUrl: './leftside.scss',
})
export class Leftside {
  private themeService = inject(ThemeService);
  constructor() {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
