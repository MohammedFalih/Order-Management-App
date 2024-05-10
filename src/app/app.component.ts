import {
  Component,
  HostBinding,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
  EventEmitter
} from '@angular/core';

import 'ids-enterprise-wc/components/ids-text/ids-text';

import {
  SohoPersonalizeDirective,
  SohoRenderLoopService,
  SohoApplicationMenuComponent,
  SohoAccordionComponent,
  SohoSearchFieldComponent,
  SohoModuleNavContainerComponent,
  SohoModuleNavSwitcherComponent,
  SohoModuleNavSettingsComponent,
  SohoModuleNavComponent
} from 'ids-enterprise-ng';

const defaultRoles: Array<SohoModuleNavSwitcherRoleRecord> = [
  { text: 'Admin', value: 'admin', icon: 'app-ac' },
  { text: 'Job Console', value: 'job-console', icon: 'app-jo' },
  { text: 'Landing Page Designer', value: 'landing-page-designer', icon: 'app-ssm' },
  { text: 'Process Server Admin', value: 'process-server-admin', icon: 'app-um' },
  { text: 'Proxy Management', value: 'proxy-management', icon: 'app-pm' },
  { text: 'Security System Management', value: 'security-system-management', icon: 'app-psa' },
  { text: 'User Management', value: 'user-management', icon: 'app-lmd' }
];

@Component({
  selector: 'body', // eslint-disable-line
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  @ViewChild(SohoModuleNavSwitcherComponent) moduleNavSwitcher?: SohoModuleNavSwitcherComponent;
  @ViewChild(SohoModuleNavContainerComponent) moduleNavContainer?: SohoModuleNavContainerComponent;

  /**
   * Local Storage Key
   */
  private static isMenuOpen = 'is-application-menu-open';

  @ViewChild(SohoModuleNavComponent, { static: true })
  public moduleNav!: SohoModuleNavComponent;

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

  public model = {
    displayMode: 'collapsed',
    selectedRole: 'admin',
    roles: defaultRoles
  }

  ngAfterViewInit(): void {
    this.moduleNavSwitcher?.setRoles(this.model.roles);
  }

  toggleModuleNavDisplayMode(e: MouseEvent) {
    if (!this.moduleNavContainer) return;

    const isCurrentlyCollapsed = this.model.displayMode === 'collapsed';
    this.model.displayMode = isCurrentlyCollapsed ? 'expanded' : 'collapsed';
  }

  private hamburgerClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  toggleModuleNav(e: MouseEvent) {
    this.hamburgerClick.next(e);
  }

  onChangeTheme(ev: SohoPersonalizeEvent) {
    this.useNewIcons = ev.data.theme === 'theme-new-light'
      || ev.data.theme === 'theme-new-dark'
      || ev.data.theme === 'theme-new-contrast';
  }
}
