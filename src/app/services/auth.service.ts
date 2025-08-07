import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MockAuthService } from './mock-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Set to true to use mock authentication with URL fragments
  private readonly USE_MOCK_AUTH = true;

  constructor(
    private oidcSecurityService: OidcSecurityService,
    private mockAuthService: MockAuthService,
    private router: Router
  ) {
    if (this.USE_MOCK_AUTH) {
      console.log('AUTH SERVICE: Using mock authentication with URL fragments');
    } else {
      console.log('AUTH SERVICE: Using real OIDC authentication');
    }
  }

  get isAuthenticated$(): Observable<boolean> {
    if (this.USE_MOCK_AUTH) {
      return this.mockAuthService.isAuthenticated$;
    }
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map(result => result.isAuthenticated)
    );
  }

  getIsAuthenticated(): Observable<boolean> {
    if (this.USE_MOCK_AUTH) {
      return this.mockAuthService.getIsAuthenticated();
    }
    return this.oidcSecurityService.isAuthenticated$.pipe(
      map(result => result.isAuthenticated)
    );
  }

  getAccessToken(): Observable<string> {
    if (this.USE_MOCK_AUTH) {
      return this.mockAuthService.getAccessToken();
    }
    return this.oidcSecurityService.getAccessToken();
  }

  getIdToken(): Observable<string> {
    if (this.USE_MOCK_AUTH) {
      return this.mockAuthService.getIdToken();
    }
    return this.oidcSecurityService.getIdToken();
  }

  getUserClaims(): Observable<any> {
    if (this.USE_MOCK_AUTH) {
      return this.mockAuthService.getUserClaims();
    }
    return this.oidcSecurityService.getUserData();
  }

  login(): void {
    if (this.USE_MOCK_AUTH) {
      console.log('AUTH SERVICE: Initiating mock OIDC implicit flow with URL fragments');
      this.mockAuthService.login();
    } else {
      console.log('AUTH SERVICE: Initiating real OIDC implicit flow login');
      this.oidcSecurityService.authorize();
    }
  }

  logout(): void {
    if (this.USE_MOCK_AUTH) {
      console.log('AUTH SERVICE: Mock logout');
      this.mockAuthService.logout();
    } else {
      console.log('AUTH SERVICE: Real OIDC logout');
      this.oidcSecurityService.logoff().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  checkAuth(): Observable<boolean> {
    if (this.USE_MOCK_AUTH) {
      console.log('AUTH SERVICE: Mock authentication check');
      return this.mockAuthService.checkAuth();
    } else {
      console.log('AUTH SERVICE: Real OIDC authentication check');
      return this.oidcSecurityService.checkAuth().pipe(
        map(loginResponse => loginResponse.isAuthenticated)
      );
    }
  }
}