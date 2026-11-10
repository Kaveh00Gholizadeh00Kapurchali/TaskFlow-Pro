import { Component, inject } from '@angular/core';
import { ThemeService } from '../../core/services/theme-service';

@Component({
  selector: 'app-theme-toggle',
  template: `
    <button type="button" class="theme-toggle" (click)="theme.toggle()"
      [attr.aria-label]="theme.theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
      <span aria-hidden="true">{{ theme.theme() === 'dark' ? '?' : '?' }}</span>
      {{ theme.theme() === 'dark' ? 'Light mode' : 'Dark mode' }}
    </button>
  `,
  styles: `.theme-toggle { display: inline-flex; align-items: center; gap: 6px; min-height: 36px; padding: 6px 10px; border: 1px solid var(--tf-border); border-radius: 9px; background: var(--tf-surface-soft); color: var(--tf-text); font-size: .78rem; font-weight: 650; white-space: nowrap; }
    .theme-toggle:hover { background: var(--tf-primary-soft); color: var(--tf-primary); }
    .theme-toggle span { font-size: 1.1rem; line-height: 1; }`,
})
export class ThemeToggle {
  protected readonly theme = inject(ThemeService);
}
