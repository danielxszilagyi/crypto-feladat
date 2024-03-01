import { UserService } from './../services/user.service';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MaterialModule } from '../material.module';

import { TabsComponent } from './tabs-view/tabs.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MaterialModule,
    TabsComponent,
    SidenavComponent,
  ],
  template: `
    <mat-sidenav-container class="pt-1">
      <!-- Sidenav -->
      <mat-sidenav mode="side" opened>
        <app-sidenav
          [username]="userObj$.username"
          [userObj$]="userObj$"
        ></app-sidenav>
      </mat-sidenav>

      <!-- Main content -->
      <mat-sidenav-content>
        <app-tabs></app-tabs>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container {
        height: 100dvh;
      }
      mat-sidenav {
        width: clamp(10rem, 20dvw, 15rem);
      }
    `,
  ],
})
export class MainComponent implements OnDestroy {
  title = 'crypto-feladat';
  userObjSub!: Subscription;
  userObj$!: any;

  constructor(private UserService: UserService) {
    this.userObjSub = this.UserService.loggedInUser$.subscribe({
      next: (data) => {
        if (data) {
          this.userObj$ = data;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.userObjSub.unsubscribe();
  }
}
