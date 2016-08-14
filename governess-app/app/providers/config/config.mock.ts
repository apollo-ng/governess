export interface AppConfig {
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
  'userLang': 'en',
  'theme'   : 'default-dark',
  'audio'   : true,
  'ctrlMode': 'auto',
  'viewPref': 'last',
  'lastView': 'Control',
  'manOverr': false,
  'keepOn'  : false,
};
