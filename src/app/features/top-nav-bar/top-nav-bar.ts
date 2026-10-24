import { Component, EventEmitter, Input, Output, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  imports: [RouterLink, MatToolbarModule, MatButtonModule],
  selector: 'app-top-nav-bar',
  styleUrl: './top-nav-bar.css',
  templateUrl: './top-nav-bar.html',
})
export class TopNavBar {
  // urls 
  @Input() homeURL : string = 'http://localhost:4200/';
  @Input() createNewTaskURL :string = '' ;
  @Input() taskManagementURL : string = '';
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
