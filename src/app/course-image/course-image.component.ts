import { Component, Input } from '@angular/core';

@Component({
  selector: 'course-image',
  standalone: true,
  imports: [],
  templateUrl: './course-image.component.html',
  styleUrl: './course-image.component.scss',
})
export class CourseImageComponent {
  @Input('src')
  imageUrl?: string;
  constructor() {}
  ngOnInit() {
    // console.log(this.imageUrl);
  }
}
