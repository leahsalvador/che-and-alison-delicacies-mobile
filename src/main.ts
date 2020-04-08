import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//API
import {
  Plugins,
  StatusBarStyle,
} from '@capacitor/core';

// Events (iOS only)
window.addEventListener('statusTap', function () {
  console.log("statusbar tapped");
});

let isStatusBarLight = true;

Plugins.StatusBar.setBackgroundColor({
  color: '#172a65'
});
Plugins.StatusBar.setStyle({
  style: isStatusBarLight ? StatusBarStyle.Dark : StatusBarStyle.Light
});
isStatusBarLight = !isStatusBarLight;

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
