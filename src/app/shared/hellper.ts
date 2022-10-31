import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// this class help me to contant must commen declrations and Methods 
export class Hellper {
  //#region Declration
  isSmallScreen: boolean;
  subscriptions: Subscription[] = [];
  //#endregion
  
  constructor(public responsive: BreakpointObserver) {}

  //#region Methods
  catchSmallScreen() {
    let subResponsive = this.responsive
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches ? true : false;
      });
    this.subscriptions.push(subResponsive);
  }
  //#endregion
}
