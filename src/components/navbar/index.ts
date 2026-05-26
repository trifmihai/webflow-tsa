import { onDomReady } from '../../utils/dom';
import { initMobileNavbarMenus } from './mobile-menu';
import { initSmartNavbar } from './smart-navbar';

export function initNavbar(): void {
  onDomReady(initMobileNavbarMenus);
  initSmartNavbar();
}
