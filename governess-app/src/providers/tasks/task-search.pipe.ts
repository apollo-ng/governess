import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from './task.model';

@Pipe({
  name: 'taskSearch',
})

export class TaskSearchPipe implements PipeTransform {
  public transform(tasks: TaskModel[], searchString: string): any {
    let matches: TaskModel[] = [];

    if (!searchString) {
      return tasks;
    }

    tasks.forEach(function (task: any): void {
      if (task.name.match(new RegExp(searchString, 'i'))) {
        matches.push(task);
      }
    });

    return matches;
  }
}
