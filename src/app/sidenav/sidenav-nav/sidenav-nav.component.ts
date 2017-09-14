import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})
export class SidenavNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe((params) =>{
    //  this.event = this.eventService.getEvent(+params['id']);
    // });

  }

}
