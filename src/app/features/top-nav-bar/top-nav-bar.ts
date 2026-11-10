import { Component, Input, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { AuthService } from '../../core/services/auth-service';


@Component({
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, ThemeToggle],
  selector: 'app-top-nav-bar',
  styleUrl: './top-nav-bar.css',
  templateUrl: './top-nav-bar.html',
})
export class TopNavBar {
  protected auth = inject(AuthService);
  // urls 
  @Input() homeURL : string = '';
  @Input() createNewTaskURL :string = '/tasks/add' ;
  @Input() taskManagementURL : string = '/tasks/list';
  @Input() createUserURL : string = '/users/add';
  @Input() timeZone : string = 'Asia/Tehran';


  currentTime = signal(new Date())
  private timeInvervalID : any ;

  ngOnInit(): void {
    this.timeInvervalID = setInterval(() => {
      this.currentTime.set(new Date())
    }, 1000);
  }
  ngOnDestroy(): void {
    if(this.timeInvervalID){
      clearInterval(this.timeInvervalID);
    }
    
  }

  FormatTime(zone: string){
    return this.currentTime().toLocaleTimeString('en-US', {
      timeZone: zone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }
  FormatDate(zone: string){
    return this.currentTime().toLocaleDateString('en-US', {
      timeZone: zone,
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }

}
