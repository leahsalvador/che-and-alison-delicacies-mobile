import { Component } from '@angular/core';
//API
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

// Events (iOS only)
window.addEventListener('statusTap', function () {
  console.log("statusbar tapped");
});

const { StatusBar } = Plugins;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor() {
  }
  isStatusBarLight = true

  changeStatusBar() {
    Plugins.StatusBar.setBackgroundColor({
      color: '#172a65'
    });
    Plugins.StatusBar.setStyle({
      style: this.isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
    });
    this.isStatusBarLight = !this.isStatusBarLight;

    // Display content under transparent status bar (Android only)
    /*Plugins.StatusBar.setOverlaysWebView({
      overlay: true
    });*/
  }

  hideStatusBar() {
    Plugins.StatusBar.hide();
  }

  showStatusBar() {
    Plugins.StatusBar.show();
  }
}
