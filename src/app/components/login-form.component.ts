import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MaterialModule } from '../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../services/user.service';
import { TabService } from '../services/tab.service';

@Component({
  selector: 'my-login-form',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  template: `
    <mat-card>
      <mat-card-title class="my-2">Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="submit()">
          <p>
            <mat-form-field>
              <input
                type="text"
                matInput
                placeholder="Username"
                formControlName="username"
              />
            </mat-form-field>
          </p>

          <p>
            <mat-form-field>
              <input
                type="password"
                matInput
                placeholder="Password"
                formControlName="password"
              />
            </mat-form-field>
          </p>
          @if (error) {
          <p class="error">
            {{ error }}
          </p>
          }

          <div class="button">
            <button type="submit" [disabled]="loginForm.invalid" mat-button>
              Login
            </button>
          </div>
        </form>
      </mat-card-content>
      <button mat-button color="primary" (click)="gyorslogin()">
        gyorsLogin
      </button>
    </mat-card>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }

      mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .error {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }

      .button {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ],
})
export class LoginFormComponent implements OnInit {
  error!: string;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(
    private userService: UserService,
    private router: Router,
    private tabService: TabService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit() {}

  submit() {
    if (this.loginForm.valid) {
      this.userService
        .checkUserInDb(
          this.loginForm.value.username,
          this.loginForm.value.password
        )
        .then((res) => {
          if (res) {
            this._snackBar.open(
              `Logged in as ${this.loginForm.value.username}`,
              'Dismiss',
              {
                duration: 1800,
              }
            );
            this.tabService.refreshTabs(this.loginForm.value.username);
            this.router.navigate(['/home']);
          } else {
            this.error = 'Wrong password';
          }
        });
    }
  }

  gyorslogin() {
    this.userService.checkUserInDb('test', 'test').then((res) => {
      this.tabService.refreshTabs('test');
      this.router.navigate(['/home']);
      this._snackBar.open(`Logged in as test`, 'Dismiss', {
        duration: 1800,
      });
    });
  }
}
