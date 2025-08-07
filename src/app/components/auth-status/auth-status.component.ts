import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-auth-status',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="auth-status">
      <div *ngIf="isAuthenticated$ | async; else loginPrompt">
        <p>✅ Authenticated</p>
        <button mat-button (click)="logout()">Logout</button>
        <details>
          <summary>User Info</summary>
          <pre>{{ (userClaims$ | async) | json }}</pre>
        </details>
      </div>
      <ng-template #loginPrompt>
        <p>🔒 Not authenticated</p>
        <button mat-raised-button color="primary" (click)="login()">Login</button>
      </ng-template>
    </div>
  `,
  styles: [`
    .auth-status {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin: 10px 0;
      background-color: #f9f9f9;
    }
    
    details {
      margin-top: 10px;
    }
    
    pre {
      background: #f0f0f0;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      max-height: 200px;
      overflow: auto;
    }
  `]
})
export class AuthStatusComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  userClaims$: Observable<any>;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.userClaims$ = this.authService.getUserClaims();
  }

  ngOnInit() {
    console.log('AuthStatusComponent initialized');
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
