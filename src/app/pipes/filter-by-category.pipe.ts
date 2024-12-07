import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../model/course';

@Pipe({
  name: 'filterByCategory',
  standalone: true,
})
export class FilterByCategoryPipe implements PipeTransform {
  transform(courses: Course[], category: string): Course[] {
    console.log(courses);
    console.log(category);
    return courses.filter((c) => c.category === category);
  }
}
