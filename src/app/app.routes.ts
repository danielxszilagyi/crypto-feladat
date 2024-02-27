import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form.component';
import { TabsComponent } from './components/tabs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: TabsComponent },
];
