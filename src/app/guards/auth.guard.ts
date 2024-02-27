// auth.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userObj: User | null = null;
  constructor(private userService: UserService, private router: Router) {
    this.userService.loggedInUser$.subscribe((user: User | null) => {
      if (user) {
        this.userObj = user;
      }
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Check if the user is authenticated
    if (this.userObj !== null) {
      return true; // Allow access to the route
    } else {
      // Redirect to the login page or another page
      return this.router.createUrlTree(['/login']);
    }
  }
}
