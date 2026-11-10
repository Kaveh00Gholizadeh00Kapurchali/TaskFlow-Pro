import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme-service';

describe('ThemeService', () => {
  let document: Document;
  let storage: Storage;

  beforeEach(() => {
    document = TestBed.inject(DOCUMENT);
    storage = document.defaultView!.localStorage;
    storage.removeItem('taskflow-theme');
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    storage.removeItem('taskflow-theme');
    document.documentElement.removeAttribute('data-theme');
  });

  it('restores the saved theme and applies it to the document', () => {
    storage.setItem('taskflow-theme', 'dark');
    const service = TestBed.inject(ThemeService);
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('updates and saves the theme when toggled', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    const service = TestBed.inject(ThemeService);
    service.toggle();
    expect(service.theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(storage.getItem('taskflow-theme')).toBe('dark');
    service.toggle();
    expect(storage.getItem('taskflow-theme')).toBe('light');
  });
});
