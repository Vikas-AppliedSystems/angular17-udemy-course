import { Component, input } from '@angular/core';

@Component({
  selector: 'app-course-title',
  standalone: true,
  imports: [],
  templateUrl: './course-title.component.html',
  styleUrl: './course-title.component.scss'
})
export class CourseTitleComponent {
/* @Input()
  title: string; */
  title = input<string>();
}
