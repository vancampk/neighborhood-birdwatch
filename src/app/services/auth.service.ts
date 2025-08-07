import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // Development mode flag - set to true to use mock auth, false for real OIDC
  private readonly DEV_MODE = true;

  private authConfig: AuthConfig = {
    // Using the original IdentityServer4 demo - this should work
    issuer: 'https://demo.duendesoftware.com',
    
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin,
    
    // Post logout redirect URI
    postLogoutRedirectUri: window.location.origin,
    
    // Client ID that supports implicit flow
    clientId: 'interactive.public.short',

    // Scope for implicit flow
    scope: 'openid profile email api',
    
    // Use implicit flow - request both id_token and access_token
    responseType: 'id_token token',
    
    // Use OIDC
    oidc: true,
    
    // Require HTTPS for production servers
    requireHttps: true,
    
    // Disable silent refresh initially to avoid complications
    useSilentRefresh: false,
    
    // Turn off strict discovery document validation
    strictDiscoveryDocumentValidation: false,
    
    // Clear location hash after login
    clearHashAfterLogin: true,
    
    // Show debug information
    showDebugInformation: true,
    
    // Skip issuer check for demo purposes
    skipIssuerCheck: true,
    
    // Disable some validations for demo
    disableAtHashCheck: true
  };

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {
    if (this.DEV_MODE) {
      console.log('AUTH SERVICE: Running in development mode with mock authentication');
      this.startMockAuthenticationFlow();
    } else {
      // Configure OAuth service for real authentication
      this.oauthService.configure(this.authConfig);
      
      // Listen for token events
      this.oauthService.events.subscribe(event => {
        console.log('OAuth event:', event);
        if (event.type === 'token_received') {
          console.log('Tokens received successfully');
          this.isAuthenticatedSubject.next(true);
        } else if (event.type === 'logout') {
          console.log('User logged out');
          this.isAuthenticatedSubject.next(false);
        } else if (event.type === 'token_expires') {
          console.log('Token expired');
          this.isAuthenticatedSubject.next(false);
        } else if (event.type === 'discovery_document_loaded') {
          console.log('Discovery document loaded successfully');
        } else if (event.type === 'jwks_load_error') {
          console.error('JWKS load error');
        } else if (event.type === 'invalid_nonce_in_state') {
          console.error('Invalid nonce in state');
        } else if (event.type === 'token_error') {
          console.error('Token error:', event);
        }
      });
      
      // Automatically start authentication process
      this.startAuthenticationFlow();
    }
  }
  
  private startMockAuthenticationFlow(): void {
    console.log('AUTH SERVICE: Starting mock authentication flow...');
    
    // Check if user already has mock tokens
    const hasExistingToken = localStorage.getItem('mock_auth_token') !== null;
    
    if (hasExistingToken) {
      console.log('AUTH SERVICE: Found existing mock token, user is authenticated');
      this.isAuthenticatedSubject.next(true);
    } else {
      console.log('AUTH SERVICE: No existing token, prompting for mock login');
      // Automatically prompt for authentication
      setTimeout(() => {
        const shouldAuthenticate = confirm('Mock Authentication Required: Click OK to simulate login, Cancel to stay logged out');
        
        if (shouldAuthenticate) {
          console.log('AUTH SERVICE: Mock authentication successful');
          this.isAuthenticatedSubject.next(true);
          localStorage.setItem('mock_auth_token', 'mock-id-token');
          localStorage.setItem('mock_access_token', 'mock-access-token');
        } else {
          console.log('AUTH SERVICE: Mock authentication declined');
          this.isAuthenticatedSubject.next(false);
        }
      }, 500); // Small delay to let the app settle
    }
  }
  
  private startAuthenticationFlow(): void {
    console.log('AUTH SERVICE: Starting automatic authentication flow...');
    
    // Try to load discovery document and login
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      console.log('Discovery document loaded, checking for valid token...');
      
      const hasIdToken = this.oauthService.hasValidIdToken();
      const hasAccessToken = this.oauthService.hasValidAccessToken();
      
      console.log('Token check - ID Token valid:', hasIdToken, 'Access Token valid:', hasAccessToken);
      
      if (hasIdToken) {
        console.log('Authentication successful - ID token is valid');
        this.isAuthenticatedSubject.next(true);
      } else {
        console.log('No valid tokens found, redirecting to login...');
        this.isAuthenticatedSubject.next(false);
        // Automatically redirect to login
        this.oauthService.initImplicitFlow();
      }
    }).catch(error => {
      console.error('Error during auth initialization:', error);
      this.isAuthenticatedSubject.next(false);
      // Even on error, try to redirect to login
      this.oauthService.initImplicitFlow();
    });
  }

  public initAuth(): Promise<boolean> {
    console.log('AUTH SERVICE: Initializing auth...');
    
    if (this.DEV_MODE) {
      // Mock authentication for development
      console.log('AUTH SERVICE: Mock authentication - simulating login prompt');
      const shouldAuthenticate = confirm('Mock Authentication: Click OK to simulate successful login, Cancel to stay logged out');
      
      if (shouldAuthenticate) {
        console.log('AUTH SERVICE: Mock authentication successful');
        this.isAuthenticatedSubject.next(true);
        
        // Store mock tokens in localStorage to persist across page reloads
        localStorage.setItem('mock_auth_token', 'mock-id-token');
        localStorage.setItem('mock_access_token', 'mock-access-token');
        
        return Promise.resolve(true);
      } else {
        console.log('AUTH SERVICE: Mock authentication declined');
        this.isAuthenticatedSubject.next(false);
        return Promise.resolve(false);
      }
    } else {
      // Real OAuth authentication
      return this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        console.log('Discovery document loaded, checking for valid token...');
        
        const hasIdToken = this.oauthService.hasValidIdToken();
        const hasAccessToken = this.oauthService.hasValidAccessToken();
        
        console.log('Token check - ID Token valid:', hasIdToken, 'Access Token valid:', hasAccessToken);
        
        if (hasIdToken) {
          console.log('Authentication successful - ID token is valid');
          this.isAuthenticatedSubject.next(true);
          return true;
        } else {
          console.log('No valid tokens found');
          this.isAuthenticatedSubject.next(false);
          return false;
        }
      }).catch(error => {
        console.error('Error during auth initialization:', error);
        this.isAuthenticatedSubject.next(false);
        return false;
      });
    }
  }

  public login(): void {
    if (this.DEV_MODE) {
      console.log('AUTH SERVICE: Mock login initiated');
      const success = confirm('Mock Login: Click OK to simulate successful login');
      if (success) {
        this.isAuthenticatedSubject.next(true);
        localStorage.setItem('mock_auth_token', 'mock-id-token');
        localStorage.setItem('mock_access_token', 'mock-access-token');
        window.location.reload(); // Reload to trigger route re-evaluation
      }
    } else {
      this.oauthService.initImplicitFlow();
    }
  }

  public logout(): void {
    if (this.DEV_MODE) {
      console.log('AUTH SERVICE: Mock logout');
      localStorage.removeItem('mock_auth_token');
      localStorage.removeItem('mock_access_token');
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/']);
    } else {
      this.oauthService.logOut();
      this.isAuthenticatedSubject.next(false);
      this.router.navigate(['/']);
    }
  }

  public get isAuthenticated(): boolean {
    if (this.DEV_MODE) {
      const hasToken = localStorage.getItem('mock_auth_token') !== null;
      console.log('AUTH SERVICE: Mock auth check, has token:', hasToken);
      return hasToken;
    } else {
      return this.oauthService.hasValidIdToken();
    }
  }

  public get accessToken(): string {
    if (this.DEV_MODE) {
      return localStorage.getItem('mock_access_token') || '';
    } else {
      return this.oauthService.getAccessToken();
    }
  }

  public get idToken(): string {
    if (this.DEV_MODE) {
      return localStorage.getItem('mock_auth_token') || '';
    } else {
      return this.oauthService.getIdToken();
    }
  }

  public get userClaims(): any {
    if (this.DEV_MODE) {
      return {
        sub: 'mock-user-123',
        name: 'Mock User',
        email: 'mock@example.com',
        preferred_username: 'mockuser'
      };
    } else {
      return this.oauthService.getIdentityClaims();
    }
  }

  public refreshToken(): Promise<boolean> {
    if (this.DEV_MODE) {
      return Promise.resolve(true);
    } else {
      return this.oauthService.silentRefresh().then(() => true).catch(() => false);
    }
  }
}
