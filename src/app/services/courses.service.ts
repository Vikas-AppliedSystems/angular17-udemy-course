import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  id: number;
  static counter = 0;
  constructor(private http: HttpClient) {
    CoursesService.counter++;
    this.id = CoursesService.counter;
  }

  getCourses(): Observable<Course[]> {
    let params = new HttpParams().set('page', '1').set('pageSize', '10');
    return this.http.get<Course[]>('/api/courses', { params });
  }

  updateCourse(course: Course) {
    let headers = new HttpHeaders().set('x-Auth', 'userId');

    this.http
      .put(`/api/courses/${course.id}`, course, { headers })
      .subscribe(() => console.log('Course updated'));
  }
}
