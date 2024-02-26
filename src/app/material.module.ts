import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatIconModule,
  MatMenuModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
