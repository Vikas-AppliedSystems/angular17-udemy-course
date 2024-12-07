import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  QueryList,
  Self,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig, CONFIG_TOKEN } from './config';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
import { HighlightedDirective } from './directives/highlighted.directive';
import { NgxUnlessDirective } from './directives/ngx-unless.directive';
import { Course } from './model/course';
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
  ],
  providers: [HttpClient, CoursesService],
})
export class AppComponent implements OnInit, AfterViewInit {
  // courses: Course[] = [];
  courses$: Observable<Course[]>;

  @ViewChildren(CourseCardComponent, { read: ElementRef })
  cards: QueryList<ElementRef>;

  todaysDate = new Date();

  @ViewChild(CourseCardComponent, { read: HighlightedDirective })
  highlightedDirective: HighlightedDirective;

  constructor(
    @Self() private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig
  ) {
    console.log('AppComponent config:', this.config);
    console.log('id', this.coursesService.id);
  }

  ngAfterViewInit() {
    // console.log(this.cards.first);
    console.log(this.highlightedDirective);
  }

  onCourseSelected(course: Course) {
    console.log('Selected course:', course);
  }

  onToggle(isHighlighted: boolean) {
    console.log('Toggled highlight:', isHighlighted);
  }

  ngOnInit(): void {
    this.courses$ = this.coursesService.getCourses();
  }

  onCourseChanged(course: Course) {
    this.coursesService.updateCourse(course);
  }
}
