import { Injectable }             from '@angular/core';
import { Storage }                from '@ionic/storage';
import { HashID }                 from '../crypto/hashid';
import { taskMock }               from './task.mock';

////////////////////////////////////////////////////////////////////////////////

@Injectable (

)

/*******************************************************************************
 *
 *   TaskService
 *
 */

export class TaskService {

  public tasks: any = [];

  private storage: Storage;
  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor (

  storage: Storage,
  hashID: HashID

  ) {

    this.hashID = hashID;
    this.storage = storage;
    this.storage.ready().then( () => {
      this.init();
    });

  }

  /*****************************************************************************
   * init
   */

  public init(): any {

    // FIXME: Pull & update latest task list via websocket from server

    return this.storage.get('tasks').then( (_tasks: string) => {
      if (!_tasks || _tasks.trim().length === 0) {
        // If no local tasks are available (i.e. test/offline), init from Mock
        this.initFromMock();
      } else {
        this.tasks = JSON.parse(_tasks);
      }
    });

  }

  /*****************************************************************************
   * copy
   * @param {id}
   */

  public copy(index: number): void {
    // crude hack to copy the array after lodash deepClone refused to work
    let copy: any = JSON.parse(JSON.stringify(this.tasks[index]));
    copy.name = copy.name + ' Copy';
    copy.tid = this.hashID.create();
    copy.ctime = Math.round(new Date().getTime());
    this.tasks.push(copy);
    this.update(this.tasks);
  }

  /*****************************************************************************
   * update
   * @param {Tasks} Object
   * @return boolean
   */

  public update(tasks: Object): any {
    this.write(tasks);
  }

  /*****************************************************************************
   * updateD
   */

  public updateD(): void {
    this.write(this.tasks);
  }

  /*****************************************************************************
   * delete
   * @param {id}
   */

  public delete(index: number): void {
    this.tasks.splice(index, 1);
    this.update(this.tasks);
  }

  /*****************************************************************************
   * reset
   */

  public reset(): void {
    this.write(taskMock);
  }

  /*****************************************************************************
   * initFromMock
   */

  private initFromMock(): void {
    let initTask: any = taskMock;
    initTask.id = this.hashID.create();
    initTask.ctime = Math.round(new Date().getTime());
    this.write(initTask);
    this.tasks = initTask;
  }

  /*****************************************************************************
   * write
   * @param Plugins Object
   */

  private write(tasks: any): void {
    this.storage.set('tasks', JSON.stringify(tasks));
  }

}
