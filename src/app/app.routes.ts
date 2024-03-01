import { Routes } from '@angular/router';
import { LoginFormComponent } from './login/login-form.component';
import { AuthGuard } from './guards/auth.guard';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'home', component: MainComponent, canActivate: [AuthGuard] },
];
