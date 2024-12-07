import { CommonModule } from '@angular/common';
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
  SkipSelf,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CourseImageComponent } from '../course-image/course-image.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [CoursesService],
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

  @Input()
  noImageTpl: TemplateRef<any>;

  @Output('courseChanged')
  courseChangedEmitter = new EventEmitter<Course>();

  constructor(@SkipSelf() private coursesService: CoursesService) {}

  ngAfterViewInit() {
    // console.log('ngAfterViewInit', this.viewChildImage);
    // console.log('ngAfterViewInit', this.contentChildImage);
    // console.log('ngAfterViewInit', this.contentChildContainer);
    // console.log('ngAfterViewInit', this.contentChildCourseImageElementRef);
    // console.log('ngAfterViewInit', this.contentChildCourseImageComponent);
    // console.log('ngAfterViewInit', this.contentChilderCourseImageComponent);
    // console.log('ngAfterViewInit', this.images);
  }

  ngAfterContentInit() {}

  ngOnInit() {
    console.log('ngOnInit', this.coursesService);
    console.log('id', this.coursesService.id);
  }

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

  onSaveClicked(description: string) {
    this.courseChangedEmitter.emit({ ...this.course, description });
  }
}
