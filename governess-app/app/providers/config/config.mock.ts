export interface AppConfig {
  clientID:   string;
  userLang:   string;
  theme:      string;
  audio:      boolean;
  ctrlMode:   string;
  viewPref:   string;
  lastView?:  string;
  manOverr:   boolean;
  keepOn:     boolean;
}

export let CONFIGMODEL: AppConfig = {
  'clientID': '',
  'userLang': 'en',
  'theme'   : 'default-dark',
  'audio'   : true,
  'ctrlMode': 'auto',
  'viewPref': 'last',
  'lastView': 'Control',
  'manOverr': false,
  'keepOn'  : false,
};
