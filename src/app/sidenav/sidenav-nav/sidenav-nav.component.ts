import { Component, OnInit, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { SnippetService } from '../../services/snippet.service';
import { MenuNavService } from '../../services/menu-nav.service';

interface SnippetMethodInterface {
  [key: string]: string;
}

@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})

export class SidenavNavComponent implements OnInit {
  @Input() mode: string;
  snippets: any; //{}[];
  sideNavMenu: {};
  objectKeys = Object.keys;
  messageFirstParam: string;

  constructor(private snippetService: SnippetService, private sidenavService: MenuNavService,
      private router: Router) {
    let query: string = 'visible=yes';

    this.snippetService.getAllSnippets(query)
      .subscribe(snippets => {
        this.snippets = snippets;
        this.sideNavMenu = this.sideNavDeserilize(this.snippets);
        this.snippetService.changeMessage(this.snippets[0].id);
        // console.log(this.sideNavMenu);
        // this.snippetModel = new SnippetModelService().deserialize(snippet);
    });

    this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          console.log('**************** sidenav-nav.component.ts ********************');
          console.log(val.url);
          console.log('************************************');
        }
    });

   }

  ngOnInit() {
    this.snippetService.currentMessage.subscribe(message => this.messageFirstParam = message);
  }

  sideNavDeserilize(snippets: {}[]) {
    let sideNavMenu = {};
    let snippetMethod: SnippetMethodInterface = null;
    Object.keys(snippets).forEach(element => {
      if (!sideNavMenu.hasOwnProperty(snippets[element]['thema']))
        sideNavMenu[snippets[element]['thema']] = {};
      if (!sideNavMenu[snippets[element]['thema']].hasOwnProperty(snippets[element]['language'])) {
        sideNavMenu[snippets[element]['thema']][snippets[element]['language']] = {};
      }
      let method: string = snippets[element]['method'];
      if (snippets[element]['lib'] != '') {
        method += '-' + snippets[element]['lib'];
      }
      sideNavMenu[snippets[element]['thema']][snippets[element]['language']][method] = snippets[element]['id'];
    /*
      if (!sideNavMenu[snippets[element]['thema']].hasOwnProperty(snippets[element]['language'])) {
        sideNavMenu[snippets[element]['thema']][snippets[element]['language']] = [];
      }
      let temp = {}; // : SnippetMethodInterface;
      let method: string = snippets[element]['method'];
      if (snippets[element]['lib'] != '')
        method += '-' + snippets[element]['lib'];
      temp[method] = snippets[element]['id'];
      sideNavMenu[snippets[element]['thema']][snippets[element]['language']].push(temp);
    */
    });

    return sideNavMenu;
  }

  public closeSidenav() {
    if (this.mode === 'over')
      this.sidenavService.close();
  }

}
