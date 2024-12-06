import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { COURSES } from '../db-data';
import { AppConfig, CONFIG_TOKEN } from './config';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { Course } from './model/course';
import { FilterByCategoryPipe } from './pipes/filter-by-category.pipe';
import { CoursesService } from './services/courses.service';
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
    NgxUnlessDirective, // TODO: do r &d on how to make this work for standalone components.
    FilterByCategoryPipe,
  ],
  providers: [HttpClient],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, AfterViewInit, DoCheck {
  courses: Course[] = COURSES;
  courses$: Observable<Course[]>;
  coursesLoaded: boolean = false;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  todaysDate = new Date();

  @ViewChild(CourseCardComponent, { read: HighlightedDirective })
  highlightedDirective: HighlightedDirective;

  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private cd: ChangeDetectorRef
  ) {
    localStorage.setItem('AppComponent config:', JSON.stringify(this.config));
    localStorage.setItem('id', this.coursesService.id.toString());
  }

  ngAfterViewInit() {
    // console.log(this.cards.first);
    // console.log(this.highlightedDirective);
  }

  onCourseSelected(course: Course) {
    console.log('Selected course:', course);
  }

  onToggle(isHighlighted: boolean) {
    console.log('Toggled highlight:', isHighlighted);
  }

  ngOnInit(): void {
    /* this.coursesService.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.coursesLoaded = true;
    }); */
  }
  ngDoCheck() {
    // console.log('ngDoCheck', this.courses, this.coursesLoaded);
    if (this.coursesLoaded) {
      this.cd.markForCheck(); // TODO: need to check why this is not working properly for onPUsh change detection.
    }
  }

  onCourseChanged(course: Course) {
    this.coursesService.updateCourse(course);
  }

  onEditButtonClick(): void {
    // this.courses = [];
    // const course = this.courses[0];
    // const newCourse = { ...course, description: 'ngOnChanges' };
    // this.courses[0] = newCourse;
    this.courses[2].category = 'BEGINNER';
  }
}
