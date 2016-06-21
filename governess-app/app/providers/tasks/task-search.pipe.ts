import {Pipe, PipeTransform} from '@angular/core';

import {Task} from './task.model';

@Pipe({
  name: 'taskSearch'
})

export class TaskSearchPipe implements PipeTransform {
  transform(tasks:Task[], searchString: string) : any {
    let matches: Task[] = [];

    if (!searchString) {
      return tasks;
    }

    tasks.forEach(function (task) {
      if (task.name.match(new RegExp(searchString, 'i'))) {
        matches.push(task);
      }
    });

    return matches;
  }
}
