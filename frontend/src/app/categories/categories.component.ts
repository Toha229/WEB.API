import { Component } from '@angular/core';
import { CategoryService } from 'src/services/category.service';
import { Category } from '../app.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService){}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void{
    this.categoryService.getCategories()
      .subscribe(response => this.categories = response.payload);
    console.log(this.categories);
  }
}
