import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Course } from '../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [CourseImageComponent, CommonModule],
})
export class CourseCardComponent
  implements OnInit, AfterViewInit, AfterContentInit
{
  @Input({
    required: true,
  })
  course: Course;

  @Input()
  cardIndex: number;

  @Output('courseSelected')
  courseEmitter = new EventEmitter<Course>();

  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;
  noImageTpl: TemplateRef<any>;

  constructor() {}

  ngAfterViewInit() {}

  ngAfterContentInit() {}

  ngOnInit() {}

  isImageVisible() {
    return this.course && this.course.iconUrl;
  }

  onCourseViewed() {
    this.courseEmitter.emit(this.course);
  }

  cardClasses() {
    if (this.course.category == 'BEGINNER') {
      return 'beginner';
    }
    return ''; // Fix: Add this line to handle the case when category is not 'BEGINNER'
  }

  cardStyles() {
    return {
      'background-image': 'url(' + this.course.iconUrl + ')',
    };
  }
}
