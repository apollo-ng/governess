import {Pipe, PipeTransform} from '@angular/core';
import {Task} from './task-model';

@Pipe({
  name: 'taskSearch',
})

export class TaskSearchPipe implements PipeTransform {
  public transform(tasks: Task[], searchString: string): any {
    let matches: Task[] = [];

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
