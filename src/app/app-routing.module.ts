import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { DisplayBookComponent } from './display-book.component';

const routes: Routes = [
  { path:'', component:SearchComponent },
  { path:'book', component:DisplayBookComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
