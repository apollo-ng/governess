
export interface AppConfig {
  userLang:   string;
  theme:      string;
  audio:      boolean;
  ctrlMode:   string;
  viewPref:   string;
  lastView?:  string;
  manOverr:   boolean;
}

export let CONFIGMODEL: Object = {
  'userLang': 'en',
  'theme'   : 'default-dark',
  'audio'   : true,
  'ctrlMode': 'auto',
  'viewPref': 'last',
  'lastView': 'Home',
  'manOverr': false,
};
