import { Component } from '@angular/core';

import { TopNavBar } from '../features/top-nav-bar/top-nav-bar';

@Component({
  imports: [TopNavBar],
  selector: 'app-main-page',
  styleUrl: './main-page.css',
  templateUrl: './main-page.html',
})
export class MainPage {}
