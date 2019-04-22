import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home.component";
import {ComposeComponent} from "../compose/compose.component";

const routes: Routes = [
  {
    path: ':id',
    component: HomeComponent,
    data: {
      title: 'Home'
    },
  },
  {
    path: 'home/compose',
    component: ComposeComponent,
    data: {
      title: 'Compose'
    },
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeRoutingModule {
}

