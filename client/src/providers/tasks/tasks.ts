import { Injectable }             from '@angular/core';
import { StorageService }         from '../storage/storage';
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
  private storage: StorageService;
  private hashID: HashID;

  /*****************************************************************************
   * constructor
   */

  constructor (

    storage: StorageService,
    hashID: HashID

  ) {

    this.storage = storage;
    this.hashID = hashID;
    this.init().then(data => {
      // console.log('All promises returned', data)
      this.tasks = data;
    });

  }

  /*****************************************************************************
   * init
   * @return {Tasks} Object Promise
   */

  public init(): Promise<{}> {
    console.log('Initializing Task Service');

    return this.storage.get('tasks').then((data: string) => {
      if (!data) {
        console.log('Got NO Storage Data - creating from Mock:');
        let initTask: any = taskMock;
        initTask.id = this.hashID.create();
        initTask.ctime = Math.round(new Date().getTime());
        this.storage.set('tasks', JSON.stringify(initTask));
        this.tasks = initTask;
        return initTask;
      }
      // console.log('Got Storage Data:', data);
      this.tasks = JSON.parse(data);
      return JSON.parse(data);
    });
  }

  /*****************************************************************************
   * get
   * @return {Tasks} Object Promise
   */

  public get(): Promise<{}> {
    return this.storage.get('tasks');
  }

  /*****************************************************************************
   * pull
   * @return {Tasks} Object Promise
   */

  public pull(): any {
    this.get().then((data: string) => {
      this.tasks = JSON.parse(data);
    });
  }

  /*****************************************************************************
   * copy
   * @param {id}
   */

  public copy(index: number): void {
    console.log('copy called to clone', this.tasks);
    // crude hack to copy the array after lodash deepClone refused to work
    let copy: any = JSON.parse(JSON.stringify(this.tasks[index]));
    copy.name = copy.name + ' Copy';
    copy.tid = this.hashID.create();
    copy.ctime = Math.round(new Date().getTime());
    this.tasks.push(copy);
    this.update(this.tasks);
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
   * update
   * @param {Tasks} Object
   * @return boolean
   */

  public update(tasks: Object): any {
    console.log('Updating tasks...');
    this.tasks = tasks;
    this.storage.set('tasks', JSON.stringify(tasks));
  }

  /*****************************************************************************
   * updateD
   */

  public updateD(): void {
    console.log('Updating tasks...');
    this.storage.set('tasks', JSON.stringify(this.tasks));
  }

  /*****************************************************************************
   * reset
   */

  public reset(): void {
    console.log('Resetting tasks...');
    this.storage.set('tasks', JSON.stringify(taskMock));
  }

}
