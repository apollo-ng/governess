import {Page, NavController} from 'ionic-angular';
import {TranslateService, TranslatePipe, TRANSLATE_PROVIDERS} from 'ng2-translate/ng2-translate';

/*

*/

@Page({
  templateUrl: 'build/pages/profiles/profiles.html',
  pipes: [TranslatePipe]
})

export class ProfilesPage {
  constructor(public nav: NavController, public translate: TranslateService) {
           // use navigator lang if available
        var userLang = navigator.language.split('-')[0];
        userLang = /(en|de|fr)/gi.test(userLang) ? userLang : 'en';

        // this trigger the use of the french or english language after setting the translations
        translate.use(userLang);

  }
}
