import { Component } from '@angular/core';
import { Course } from '../app.component';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses: Course[] = [];

  constructor(private courseService: CourseService){}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void{
    this.courseService.getCourses()
      .subscribe(response => this.courses = response.payload);
    console.log(this.courses);
  }

}
