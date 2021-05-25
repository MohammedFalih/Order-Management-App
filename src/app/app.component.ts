import {
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import IdsAlert from 'ids-enterprise-wc/ids-alert/ids-alert.js';
import IdsTag from 'ids-enterprise-wc/ids-tag/ids-tag.js';
import IdsText from 'ids-enterprise-wc/ids-text/ids-text.js';
import IdsIcon from 'ids-enterprise-wc/ids-icon/ids-icon.js';
import IdsContainer from 'ids-enterprise-wc/ids-container/ids-container.js';

// import IdsLayoutGrid from 'ids-enterprise-wc/ids-layout-grid/ids-layout-grid.js';
// import IdsLayoutGridCell from 'ids-enterprise-wc/ids-layout-grid-cell/ids-layout-grid-cell.js';
import 'ids-enterprise-wc/ids-layout-grid/ids-layout-grid.js';

import {
  SohoPersonalizeDirective,
  SohoRenderLoopService,
  SohoApplicationMenuComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'body', // eslint-disable-line
  templateUrl: 'app.component.html',
  styleUrls: [ './app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {

  /**
   * Local Storage Key
   */
  private static isMenuOpen = 'is-application-menu-open';

  @ViewChild(SohoApplicationMenuComponent, { static: true })
  public applicationMenu!: SohoApplicationMenuComponent;

  @ViewChild(SohoPersonalizeDirective, { static: true }) personalize?: SohoPersonalizeDirective;

  @HostBinding('class.no-scroll') get isNoScroll() { return true; }

  /**
   * Include the new icons only if required by the current theme, this
   * is not quite perfect, as we need to listen for the theme change here.
   * Maybe wrap all the icons into their own component?
   */
  public useNewIcons = true;

  public personalizeOptions: SohoPersonalizeOptions = {};

  constructor(private readonly renderLoop: SohoRenderLoopService) {
    // Init render loop manually for Angular applications
    // Ensures requestAnimationFrame is running outside of Angular Zone
    this.renderLoop.start();
  }

  ngAfterViewInit(): void {

    /**
     * Note: If using an input like [triggers]="[ '.application-menu-trigger' ]"
     * hookup the app menu trigger once the afterViewInit is called. This will
     * ensure that the toolbar has had a chance to create the application-menu-trugger
     * button.
     * this.applicationMenu.triggers = [ '.application-menu-trigger' ];
     */
    if (this.isApplicationMenuOpen) {
      this.applicationMenu.openMenu(true, true);
    } else {
      this.applicationMenu.closeMenu();
    }
  }

  public get isApplicationMenuOpen(): boolean {
    const valueString = localStorage.getItem(AppComponent.isMenuOpen);
    return valueString ? (valueString === 'true') : true;
  }

  public set isApplicationMenuOpen(open: boolean) {
    localStorage.setItem(AppComponent.isMenuOpen, open ? 'true' : 'false');
  }

  onChangeTheme(ev: SohoPersonalizeEvent) {
    this.useNewIcons = ev.data.theme === 'theme-uplift-light'
      || ev.data.theme === 'theme-uplift-dark'
      || ev.data.theme === 'theme-uplift-contrast'
      || ev.data.theme === 'theme-new-light'
      || ev.data.theme === 'theme-new-dark'
      || ev.data.theme === 'theme-new-contrast';
  }

  public onMenuVisibility(visible: boolean): void {
    if (this.isApplicationMenuOpen !== visible) {
      this.isApplicationMenuOpen = visible;
    }
  }
}
