import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';

import {
  CategoriesComponent,
  CategoryData,
} from './components/categories.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MaterialModule, CategoriesComponent],
  template: `
    <div class="sidenav py-4 px-2">
      <p id="sidenavUsername" class="ps-2" color="primary">
        <span class="opacity-75">User: </span>{{ username | uppercase }}
      </p>
      @for (category of categories; track $index) { @if (category) {
      <app-categories [categoryData]="category"></app-categories>
      } }
    </div>
  `,
  styles: `
  .sidenav p:first-of-type {
    font-size: 1.5rem;
  }
  #sidenavUsername{
    color: #673ab7;
  }
 `,
})
export class SidenavComponent {
  @Input() username!: string;
  @Input() userObj$!: any;

  categories: CategoryData[] = [
    {
      categoryTitle: 'Favourites',
      elements: [{ name: 'Fav1' }, { name: 'Fav2' }],
    },
  ];
}
