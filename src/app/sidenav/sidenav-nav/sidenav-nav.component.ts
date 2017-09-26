import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SnippetService } from '../../services/snippet.service';

interface SnippetMethodInterface {
  [key: string]: string;
}

@Component({
  selector: 'app-sidenav-nav',
  templateUrl: './sidenav-nav.component.html',
  styleUrls: ['./sidenav-nav.component.scss']
})

export class SidenavNavComponent implements OnInit {
  snippets: {}[];
  sideNavMenu: {};
  objectKeys = Object.keys;
  pages = [1, 2, 3, 4, 5];

  constructor(private snippetService: SnippetService) {
    let query: string = 'visible=yes';

    this.snippetService.getAllSnippets(query)
      .subscribe(snippets => {
        this.snippets = snippets;
        console.log("snippets: ");
        console.log(snippets);
        console.log('sideNavDeserilize() = ');
        this.sideNavMenu = this.sideNavDeserilize(this.snippets);
        console.log(this.sideNavMenu);

      // this.snippetModel = new SnippetModelService().deserialize(snippet);
    });


   }

  ngOnInit() {
    // this.sub = this.route.params.subscribe((params) =>{
    //  this.event = this.eventService.getEvent(+params['id']);
    // });

  }

  sideNavDeserilize(snippets: {}[]) {
    let sideNavMenu = {};
    let snippetMethod: SnippetMethodInterface = null;
    // console.log('1) sideNavDeserilize() = ');
    // console.log(snippets);
    // console.log('2) sideNavDeserilize() = ');
    Object.keys(snippets).forEach(element => {
      // console.log(element + ':');
      // console.log(snippets[element]);
      // console.log(snippets[element]['method']);
      if (!sideNavMenu.hasOwnProperty(snippets[element]['thema']))
        sideNavMenu[snippets[element]['thema']] = {};
      if (!sideNavMenu[snippets[element]['thema']].hasOwnProperty(snippets[element]['language'])) {
        sideNavMenu[snippets[element]['thema']][snippets[element]['language']] = {};
      }
      // let temp = {}; // : SnippetMethodInterface;
      let method: string = snippets[element]['method'];
      if (snippets[element]['lib'] != '')
        method += '-' + snippets[element]['lib'];
      // temp[method] = snippets[element]['id'];
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

}
