import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-component-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  doShow: boolean;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

}
