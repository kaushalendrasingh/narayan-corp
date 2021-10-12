import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminAuthGuard } from './admin-auth.guard';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FrontViewComponent } from './front-view/front-view.component';
import { NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component:FrontViewComponent},
  {path: 'admin',component:AdminLoginComponent},
  {path: '', loadChildren: () => import('./front/front.module').then(m => m.FrontModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
