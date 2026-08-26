import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkMode = signal(localStorage.getItem('theme') === 'dark');

  constructor() {
    document.documentElement.classList.toggle('dark', this.isDarkMode());
  }

  toggleTheme(): void {
    this.isDarkMode.update((isDark) => !isDark);

    const newTheme = this.isDarkMode() ? 'dark' : 'light';

    document.documentElement.classList.toggle('dark', this.isDarkMode());

    localStorage.setItem('theme', newTheme);
  }
}
