import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationDetectionsComponent } from './components/station/station';
import { MainPageComponent } from './components/main-page/main-page.component';
import { FavoritesPageComponent } from './components/favorites-page/favorites-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: MainPageComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'station/:id', 
    component: StationDetectionsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'favorites', 
    component: FavoritesPageComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '' }, // Optional: Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
