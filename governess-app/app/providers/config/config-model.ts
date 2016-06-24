
export interface AppConfig {
  userLang:   string;
  theme:      string;
  ctrlMode:   string;
  viewPref:   string;
  lastView?:  string;
  manOverr:   boolean;
}

export let CONFIGMODEL: Object = {
  'userLang': 'en',
  'theme'   : 'default-dark',
  'ctrlMode': 'auto',
  'viewPref': 'last',
  'lastView': 'Home',
  'manOverr': false,
};
