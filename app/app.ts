import {Component, ViewChild} from '@angular/core';
import {App, ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ProfileListPage} from './pages/profile-list/profile-list';
import {AppliancePage} from './pages/appliance/appliance';
import {SettingsPage} from './pages/settings/settings';
import {HelpPage} from './pages/help/help';
import {AboutPage} from './pages/about/about';

@Component({
  templateUrl: 'build/app.html',
  config: {
        modalEnter: 'modal-slide-in',
  modalLeave: 'modal-slide-out',
  tabbarPlacement: 'top',
  pageTransition: 'slide-in'
  } // http://ionicframework.com/docs/v2/api/config/Config/
})

class governess {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = AboutPage;
  pages: Array<{title: string, icon: string, component: any}>

  constructor(private platform: Platform, private menu: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Appliance', icon: 'power', component: AppliancePage },
      { title: 'Profiles', icon: 'navigate', component: ProfileListPage },
      { title: 'Settings', icon: 'settings', component: SettingsPage },
      { title: 'Help', icon: 'help-buoy', component: HelpPage },
      { title: 'About', icon: 'speakerphone', component: AboutPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(governess);
