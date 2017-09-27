import { Injectable } from '@angular/core';
import { MdSidenav, MdDrawerToggleResult } from '@angular/material';

@Injectable()
export class MenuNavService {
  private sidenav: MdSidenav;

  public setSidenav(sidenav: MdSidenav) {
    this.sidenav = sidenav;
  }

  public close(): Promise<MdDrawerToggleResult> {
    return this.sidenav.close();
  }

  public open(): Promise<MdDrawerToggleResult> {
    return this.sidenav.open();
  }

  public toggle(isOpen?: boolean): Promise<MdDrawerToggleResult> {
    return this.sidenav.toggle(isOpen);
  }
 
  constructor() {
  }
}
