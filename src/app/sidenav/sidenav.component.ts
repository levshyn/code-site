import { Component, OnInit, ChangeDetectorRef, ViewChild,
  OnDestroy } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MdSidenav } from '@angular/material';
import { MenuNavService } from '../services/menu-nav.service';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') public sidenav: MdSidenav;

  openFlag: boolean;
  modeFlag: string;
  componentDestroyed$: Subject<boolean> = new Subject();

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router,
     private cdRef: ChangeDetectorRef, private sidenavService: MenuNavService,
     media: ObservableMedia) {
      media.asObservable()
      .takeUntil(this.componentDestroyed$)
      .subscribe((change: MediaChange) => {
        // if a screen size more less 600px (@angular/flex-layout static API, breakpoint xs)
        // side nav is invisible by default
        if (change.mqAlias == 'lg' || change.mqAlias == 'xl' || change.mqAlias == 'md' || change.mqAlias == 'sm') {
        // if (change.mqAlias == 'lg' || change.mqAlias == 'xl' || change.mqAlias == 'md') {
          this.openFlag = true;
          this.modeFlag = 'side';
        }
        else {
          this.openFlag = false;
          this.modeFlag = 'over';
        }
      });
  }

  ngOnInit(): void {
    this.onResize();

    this.sidenavService
      .setSidenav(this.sidenav);
  }

  // Resize method for the responsive design (for side nav)
  onResize(event?) {
    let width: number;

    if(event != undefined){
      width = event.target.innerWidth;
      // console.log(event.target.innerWidth);
    }
    else {
      width = document.body.clientWidth;
      // console.log(document.body.clientWidth);
    }
    /*
    if (width >= 840) {
      this.openFlag = true;
    }
    else {
      this.openFlag = false;
    }
    */
  }

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

}
