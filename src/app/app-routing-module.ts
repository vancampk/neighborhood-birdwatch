import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StationsComponent } from './components/stations/stations';
import { StationDetectionsComponent } from './components/station/station';

const routes: Routes = [
  { path: '', component: StationsComponent },
  { path: 'stations', component: StationsComponent },
  { path: 'station/:id', component: StationDetectionsComponent },
  { path: '**', redirectTo: '' } // Optional: Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
