import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, of } from 'rxjs';
import { map, take, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('AUTH GUARD: Checking authentication...');
    
    // Check if we're currently in the process of handling an OAuth callback
    const hasTokenInUrl = window.location.hash.includes('id_token') || 
                         window.location.hash.includes('access_token') ||
                         window.location.search.includes('code=');
    
    if (hasTokenInUrl) {
      console.log('AUTH GUARD: OAuth callback detected, allowing navigation');
      return true;
    }

    // Check current authentication status synchronously first
    const isCurrentlyAuthenticated = this.authService.isAuthenticated;
    console.log('AUTH GUARD: Current sync auth status:', isCurrentlyAuthenticated);
    
    if (isCurrentlyAuthenticated) {
      return true;
    }

    // If not authenticated, wait briefly for the automatic auth flow to complete
    console.log('AUTH GUARD: Not authenticated, waiting for auth flow...');
    return of(false).pipe(
      delay(1000), // Give the auth service time to start the flow
      map(() => {
        const authStatus = this.authService.isAuthenticated;
        console.log('AUTH GUARD: Auth status after delay:', authStatus);
        
        if (!authStatus) {
          console.log('AUTH GUARD: Still not authenticated, blocking access');
          // The auth service should have already redirected to login
        }
        
        return authStatus;
      })
    );
  }
}
