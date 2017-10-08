import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { SnippetService } from '../../services/snippet.service';
import { MenuNavService } from '../../services/menu-nav.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

interface MenuInterface {
  [key: string]: any;
}

@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})

export class SidenavNavComponent implements OnInit, OnDestroy {
  @Input() mode: string;
  snippets: Array<any>;
  sideNavMenu: MenuInterface;
  objectKeys = Object.keys;
  messageFirstParam: string;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private snippetService: SnippetService, private sidenavService: MenuNavService,
      private router: Router, private _elementRef: ElementRef) {
    let query: string = 'visible=yes';

    this.snippetService.getAllSnippets(query)
      .takeUntil(this.componentDestroyed$)
      .subscribe(snippets => {
        this.snippets = snippets;
        this.sideNavMenu = this.sideNavDeserilize(this.snippets);
        this.snippetService.changeMessage(this.snippets[0].id);
    });
   }

  ngOnInit() {
  }

  sideNavDeserilize(snippets: Array<any>) {
    let sideNavMenu : MenuInterface = {};
    console.log('sideNavMenu = ');
    console.log(sideNavMenu);
    // let snippetMethod: SnippetMethodInterface = null;
    Object.keys(snippets).forEach(element => {
      let thema: string = snippets[element]['thema'];
      thema = thema.toLowerCase();
      if (!sideNavMenu.hasOwnProperty(thema)) {
        sideNavMenu[thema] = {};
      }
      let language: string = snippets[element]['language'];
      language = language.toLowerCase();
      if (!sideNavMenu[thema].hasOwnProperty(language)) {
        sideNavMenu[thema][language] = {};
      }
      let method: string = snippets[element]['method'];
      if (snippets[element]['lib'] != '') {
        let lib: string = snippets[element]['lib'];
        lib = lib.toLowerCase();
        method += '-' + lib;
      }
      sideNavMenu[thema][language][method] = snippets[element]['id'];
    });

    return sideNavMenu;
  }

  public closeSidenav() {
    if (this.mode === 'over')
      this.sidenavService.close();
  }

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  ngAfterViewInit() {
    this.snippetService.changeSideNavEl(this._elementRef);
  }

}
