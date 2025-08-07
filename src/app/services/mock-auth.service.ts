import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockAuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isInitialized = false;
  private isLoginInProgress = false;
  private isInitializing = false;
  
  private mockUserData = {
    sub: 'mock-user-123',
    name: 'Mock User', 
    email: 'mock.user@example.com',
    preferred_username: 'mockuser',
    given_name: 'Mock',
    family_name: 'User',
    aud: 'mock-client-id',
    iss: 'https://mock-authority.com',
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    iat: Math.floor(Date.now() / 1000),
    auth_time: Math.floor(Date.now() / 1000)
  };

  constructor(private router: Router) {
    // Only check for tokens in URL on initialization, don't trigger login
    this.initializeAuth();
  }

  private initializeAuth(): void {
    if (this.isInitialized || this.isInitializing) return;
    
    this.isInitializing = true;
    console.log('MOCK AUTH: Initializing authentication');
    
    // First check if there are tokens in the URL
    this.checkForTokensInUrl();
    
    // Then check if there are stored tokens
    const hasStoredTokens = localStorage.getItem('mock_access_token') !== null && 
                           localStorage.getItem('mock_id_token') !== null;
    
    if (hasStoredTokens) {
      console.log('MOCK AUTH: Found stored tokens, user is authenticated');
      this.isAuthenticatedSubject.next(true);
    } else {
      console.log('MOCK AUTH: No stored tokens, user is not authenticated');
      this.isAuthenticatedSubject.next(false);
    }
    
    this.isInitialized = true;
    this.isInitializing = false;
    console.log('MOCK AUTH: Initialization complete');
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getIsAuthenticated(): Observable<boolean> {
    return of(this.isAuthenticatedSubject.value);
  }

  getAccessToken(): Observable<string> {
    const token = localStorage.getItem('mock_access_token');
    return of(token || '');
  }

  getIdToken(): Observable<string> {
    const token = localStorage.getItem('mock_id_token');
    return of(token || '');
  }

  getUserClaims(): Observable<any> {
    const isAuth = this.isAuthenticatedSubject.value;
    return of(isAuth ? this.mockUserData : null);
  }

  login(): void {
    if (this.isLoginInProgress) {
      console.log('MOCK AUTH: Login already in progress, ignoring request');
      return;
    }
    
    console.log('MOCK AUTH: Simulating OIDC implicit flow redirect');
    this.isLoginInProgress = true;
    
    // Simulate the redirect immediately for testing
    console.log('MOCK AUTH: Auto-simulating successful login for testing');
    this.simulateOidcRedirect();
  }

  logout(): void {
    console.log('MOCK AUTH: Logging out');
    localStorage.removeItem('mock_access_token');
    localStorage.removeItem('mock_id_token');
    localStorage.removeItem('mock_session_state');
    this.isAuthenticatedSubject.next(false);
    
    // Clear URL fragments if they exist
    if (window.location.hash) {
      window.location.hash = '';
    }
    
    this.router.navigate(['/']);
  }

  checkAuth(): Observable<boolean> {
    console.log('MOCK AUTH: checkAuth() called - isInitialized:', this.isInitialized, 'isInitializing:', this.isInitializing);
    
    // If we're currently initializing, return the current state without triggering anything
    if (this.isInitializing) {
      console.log('MOCK AUTH: Currently initializing, returning current state');
      return of(this.isAuthenticatedSubject.value);
    }
    
    // If not initialized yet, initialize first
    if (!this.isInitialized) {
      console.log('MOCK AUTH: Not initialized, starting initialization');
      this.initializeAuth();
    }
    
    // Return the current authentication state
    const hasTokens = localStorage.getItem('mock_access_token') !== null && 
                     localStorage.getItem('mock_id_token') !== null;
    
    console.log('MOCK AUTH: Final check - has stored tokens:', hasTokens);
    this.isAuthenticatedSubject.next(hasTokens);
    
    return of(hasTokens);
  }

  private simulateOidcRedirect(): void {
    console.log('MOCK AUTH: Starting simulated redirect...');
    
    // Generate mock tokens
    const mockIdToken = this.generateMockJwt('id_token');
    const mockAccessToken = this.generateMockJwt('access_token');
    const mockState = 'mock-state-' + Math.random().toString(36).substr(2, 9);
    
    // Create URL fragments like a real OIDC implicit flow
    const fragments = [
      `id_token=${mockIdToken}`,
      `access_token=${mockAccessToken}`,
      `token_type=Bearer`,
      `expires_in=3600`,
      `scope=openid profile email`,
      `state=${mockState}`,
      `session_state=mock-session-${Math.random().toString(36).substr(2, 9)}`
    ].join('&');

    console.log('MOCK AUTH: Simulating redirect with fragments');
    
    // Update URL with fragments (like OIDC provider would do)
    window.location.hash = fragments;
    
    // Process the tokens after a brief delay to simulate network
    setTimeout(() => {
      this.processTokensFromUrl();
      this.isLoginInProgress = false;
    }, 200);
  }

  private processTokensFromUrl(): void {
    const hash = window.location.hash;
    
    if (hash && (hash.includes('id_token=') || hash.includes('access_token='))) {
      console.log('MOCK AUTH: Processing tokens from URL hash');
      
      // Parse the hash fragments
      const params = new URLSearchParams(hash.substring(1));
      const idToken = params.get('id_token');
      const accessToken = params.get('access_token');
      const sessionState = params.get('session_state');
      
      if (idToken && accessToken) {
        console.log('MOCK AUTH: Storing tokens from URL');
        
        // Store tokens
        localStorage.setItem('mock_id_token', idToken);
        localStorage.setItem('mock_access_token', accessToken);
        if (sessionState) {
          localStorage.setItem('mock_session_state', sessionState);
        }
        
        // Update authentication state
        this.isAuthenticatedSubject.next(true);
        
        // Clear the hash from URL (like real OIDC libraries do)
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
        
        console.log('MOCK AUTH: Authentication successful via URL fragments');
        
        // Navigate to trigger route re-evaluation
        this.router.navigateByUrl(this.router.url);
      }
    }
  }

  private checkForTokensInUrl(): void {
    const hash = window.location.hash;
    
    if (hash && (hash.includes('id_token=') || hash.includes('access_token='))) {
      console.log('MOCK AUTH: Found tokens in URL hash during initialization');
      this.processTokensFromUrl();
    } else {
      console.log('MOCK AUTH: No tokens found in URL hash');
    }
  }

  private generateMockJwt(type: 'id_token' | 'access_token'): string {
    // Create a simple mock JWT structure (header.payload.signature)
    const header = {
      alg: 'RS256',
      typ: 'JWT',
      kid: 'mock-key-id'
    };

    const payload = type === 'id_token' ? {
      ...this.mockUserData,
      nonce: 'mock-nonce-' + Math.random().toString(36).substr(2, 9),
      at_hash: 'mock-at-hash'
    } : {
      sub: this.mockUserData.sub,
      aud: 'mock-client-id',
      iss: 'https://mock-authority.com',
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
      scope: 'openid profile email'
    };

    // Base64 encode (simplified mock)
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    const mockSignature = 'mock-signature-' + Math.random().toString(36).substr(2, 20);

    return `${encodedHeader}.${encodedPayload}.${mockSignature}`;
  }
}
