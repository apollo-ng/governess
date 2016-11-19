import { AboutPage }              from './about/about';
import { AppliancesPage }         from './appliances/appliances';
import { ApplianceDetailPage }    from './appliances/appliance.detail';
import { ControlPage }            from './control/control';
import { HelpPage }               from './help/help';
import { LogsPage }               from './logs/logs';
import { SettingsPage }           from './settings/settings';
import { TasksPage }              from './tasks/tasks';
import { TaskDetailPage }         from './tasks/task.detail';

import { ControlHelp }            from './control/control.help';
import { SettingsHelp }           from './settings/settings.help';
import { TasksHelp }              from './tasks/tasks.help';

/**
 * The Pages array lists all of the pages we want to use in our app.
 * We then take these pages and inject them into our NgModule so Angular
 * can find them. As you add and remove pages, make sure to keep this list
 * up to date.
 */

export const pageList: any[] = [
  AboutPage,
  AppliancesPage,
  ApplianceDetailPage,
  ControlPage,
  ControlHelp,
  HelpPage,
  LogsPage,
  SettingsPage,
  SettingsHelp,
  TasksPage,
  TasksHelp,
  TaskDetailPage,
];

// The page the user lands on after opening the app and without a config
export const firstRunPage: any = ControlPage;
