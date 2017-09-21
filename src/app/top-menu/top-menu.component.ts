import { Component, OnInit } from '@angular/core';
import { MenuNavService } from '../services/menu-nav.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})

export class TopMenuComponent implements OnInit {

  constructor(private sidenavService: MenuNavService) { }

  ngOnInit(): void {
  }

  public toggleSidenav() {
    this.sidenavService
      .toggle()
      .then(() => {
      });
  }

}
