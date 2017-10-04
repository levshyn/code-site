import { Component, OnInit } from '@angular/core';
import { MenuNavService } from '../services/menu-nav.service';
import { Router, NavigationEnd } from '@angular/router';
import { SnippetService } from '../services/snippet.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})

export class TopMenuComponent implements OnInit {

  private previousUrl: string;

  constructor(private sidenavService: MenuNavService, private snippetService: SnippetService,
    private router: Router) {

    router.events
    .filter(event => event instanceof NavigationEnd)
    .subscribe((e: any) => {
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
      console.log('EEEEEEEEEEEEEE top-menu.component.ts EEEEEEEEEEEEEEEEEEEEEE');
      console.log('prev:', this.previousUrl);
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
      this.previousUrl = e.url;
      this.snippetService.changeUrl(e.url);

    });

   }

  ngOnInit(): void {
  }

  public toggleSidenav() {
    this.sidenavService
      .toggle()
      .then(() => {
      });
  }

}
