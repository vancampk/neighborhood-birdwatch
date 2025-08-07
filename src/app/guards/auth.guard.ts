import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, delay, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private lastAuthCheck = 0;
  private readonly AUTH_CHECK_DEBOUNCE = 1000; // 1 second

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    const now = Date.now();
    console.log('AUTH GUARD: canActivate called, last check was', now - this.lastAuthCheck, 'ms ago');

    // Prevent rapid successive auth checks
    if (now - this.lastAuthCheck < this.AUTH_CHECK_DEBOUNCE) {
      console.log('AUTH GUARD: Debouncing auth check, returning current auth state');
      return this.authService.isAuthenticated$;
    }

    this.lastAuthCheck = now;
    console.log('AUTH GUARD: Checking if user can activate route');

    return this.authService.checkAuth().pipe(
      delay(100), // Small delay to let initialization complete
      tap(isAuthenticated => console.log('AUTH GUARD: Auth check result after delay:', isAuthenticated)),
      switchMap((isAuthenticated: boolean) => {        
        if (isAuthenticated) {
          console.log('AUTH GUARD: User is authenticated, allowing access');
          return of(true);
        } else {
          console.log('AUTH GUARD: User not authenticated, starting login flow');
          this.authService.login();
          
          // Wait for authentication state changes after login
          return this.authService.isAuthenticated$.pipe(
            delay(500), // Give time for login flow to complete
            tap(authState => console.log('AUTH GUARD: Auth state after login attempt:', authState)),
            map(authState => {
              if (!authState) {
                console.log('AUTH GUARD: Login failed or cancelled, denying access');
              }
              return authState;
            })
          );
        }
      })
    );
  }
}