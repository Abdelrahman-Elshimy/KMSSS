import { UserSessionService } from './../../services/UserSessionService';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  userSession = null;
  constructor(private userSessionService: UserSessionService) {
    this.userSession = userSessionService.getUser();
    console.log("session",this.userSession);
  }
  ngOnInit(): void {
    this.userSessionService.getUserObservable().subscribe(user => {
      this.userSession = user;
      console.log("session changed", this.userSession);
    });
  }

  logout(){
    this.userSession = null;
    this.userSessionService.logout();
  }


}
