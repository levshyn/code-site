import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuNavService } from '../services/menu-nav.service';
import { Router, NavigationEnd } from '@angular/router';
import { SnippetService } from '../services/snippet.service';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})

export class TopMenuComponent implements OnInit, OnDestroy {

  private previousUrl: string;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private sidenavService: MenuNavService, private snippetService: SnippetService,
    private router: Router) {

    router.events
    .filter(event => event instanceof NavigationEnd)
    .takeUntil(this.componentDestroyed$)
    .subscribe((e: any) => {
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

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

}
