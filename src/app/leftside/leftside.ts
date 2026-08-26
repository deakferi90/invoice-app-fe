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
  protected themeService = inject(ThemeService);

  private isProcessing = false;

  toggleTheme(): void {
    if (this.isProcessing) {
      return;
    }

    this.isProcessing = true;

    this.themeService.toggleTheme();

    setTimeout(() => {
      this.isProcessing = false;
    }, 200);
  }
}
