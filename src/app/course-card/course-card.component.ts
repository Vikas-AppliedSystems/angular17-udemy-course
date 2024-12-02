import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
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

  @ViewChild('courseImage') // view child does not see content projected image eg:- ng-content.
  viewChildImage: any;

  @ContentChild('courseImage')
  contentChildImage: CourseImageComponent;

  @ContentChild('container') // content child does not see anything else other than content projected.
  contentChildContainer: any;

  @ContentChild(CourseImageComponent)
  contentChildCourseImageComponent: CourseImageComponent;

  @ContentChild(CourseImageComponent, { read: ElementRef })
  contentChildCourseImageElementRef: ElementRef;

  @ContentChildren(CourseImageComponent)
  contentChilderCourseImageComponent: QueryList<CourseImageComponent>;

  @Output('courseSelected')
  courseEmitter = new EventEmitter<Course>();

  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;
  noImageTpl: TemplateRef<any>;

  constructor() {}

  ngAfterViewInit() {
    // console.log('ngAfterViewInit', this.viewChildImage);
    // console.log('ngAfterViewInit', this.contentChildImage);
    // console.log('ngAfterViewInit', this.contentChildContainer);
    // console.log('ngAfterViewInit', this.contentChildCourseImageElementRef);
    // console.log('ngAfterViewInit', this.contentChildCourseImageComponent);
    // console.log('ngAfterViewInit', this.contentChilderCourseImageComponent);
    console.log('ngAfterViewInit', this.images);
  }

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
