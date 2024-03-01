import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

const modules = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatDividerModule,
  MatTooltipModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
