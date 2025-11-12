import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeServiceService {

  private darkThemeKey = 'dark-theme';

  toggleTheme():void {
    document.body.classList.toggle(this.darkThemeKey);

    const isDark = document.body.classList.contains(this.darkThemeKey)
    localStorage.setItem("isDarkMode", JSON.stringify(isDark))
  }

  loadTheme(): void {
    const isDark = JSON.parse(localStorage.getItem('isDarkMode') || 'false');
    if (isDark) {
      document.body.classList.add(this.darkThemeKey)
    }
  }
}
