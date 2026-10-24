import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

import { MainPage } from './main-page/main-page';
import { TopNavBar } from './features/top-nav-bar/top-nav-bar';

@Component({
  imports: [RouterOutlet, RouterLink, MainPage, TopNavBar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TaskFlow-Pro');
}
