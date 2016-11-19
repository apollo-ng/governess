import { Storage }                from '@ionic/storage';
import { WebSocketService }       from './websocket/websocket';
import { StorageService }         from './storage/storage';
import { ConfigService }          from './config/config';
import { StatusService }          from './status/status';
import { ApplianceService }       from './appliances/appliances';
import { TaskService }            from './tasks/tasks';

export {
  Storage,
  StorageService,
  ConfigService,
  ApplianceService,
  StatusService,
  TaskService,
  WebSocketService,
};

export const providerList: any[] = [
  Storage,
  StorageService,
  ConfigService,
  ApplianceService,
  StatusService,
  TaskService,
  WebSocketService,
];
