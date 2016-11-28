export interface AppConfigModel {
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
