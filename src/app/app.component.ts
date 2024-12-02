import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { COURSES } from '../db-data';
import { Course } from './model/course';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { CommonModule } from '@angular/common';
import { HighlightedDirective } from './directives/highlighted.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CourseCardComponent,
    CourseImageComponent,
    CommonModule,
    HighlightedDirective,
  ],
})
export class AppComponent implements AfterViewInit {
  courses = COURSES;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  todaysDate = new Date();

  constructor() {}

  ngAfterViewInit() {
    // console.log(this.cards.first);
  }

  onCourseSelected(course: Course) {
    console.log('Selected course:', course);
  }

  onToggle(isHighlighted: boolean) {
    console.log('Toggled highlight:', isHighlighted);
  }
}
