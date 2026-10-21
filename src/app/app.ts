import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {LoginPage} from './login-page/login-page';

@Component({
  imports: [RouterOutlet, LoginPage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('TaskFlow-Pro');
}
