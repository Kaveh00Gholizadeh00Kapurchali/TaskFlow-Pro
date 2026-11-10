import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly state = signal<Theme>(this.initialTheme());
  readonly theme = this.state.asReadonly();

  constructor() {
    this.apply(this.state());
  }

  toggle(): void {
    const theme = this.state() === 'dark' ? 'light' : 'dark';
    this.state.set(theme);
    this.apply(theme);
    try {
      this.document.defaultView?.localStorage.setItem('taskflow-theme', theme);
    } catch {
      // The current session still works when storage is unavailable.
    }
  }

  private initialTheme(): Theme {
    const initial = this.document.documentElement.getAttribute('data-theme');
    if (initial === 'light' || initial === 'dark') return initial;
    const view = this.document.defaultView;
    try {
      const saved = view?.localStorage.getItem('taskflow-theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // Fall back to the system preference.
    }
    return view?.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private apply(theme: Theme): void {
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
