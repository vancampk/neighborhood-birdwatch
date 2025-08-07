import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './graphql.module';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { GlobalControlsComponent } from './components/global-controls/global-controls.component';
import { AuthStatusComponent } from './components/auth-status/auth-status.component';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    GraphQLModule,
    CommonModule,
    FontAwesomeModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    GlobalControlsComponent,
    AuthStatusComponent,
    AuthModule.forRoot({
      config: {
        // Using a test configuration for now
        authority: 'https://demo.duendesoftware.com',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'interactive.implicit',
        scope: 'openid profile email',
        responseType: 'id_token token',
        silentRenew: false,
        useRefreshToken: false,
        ignoreNonceAfterRefresh: true,
        autoUserInfo: false,
      }
    })
  ],
  exports: [App, CommonModule, FontAwesomeModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
