import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, Route, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate
{
  constructor(private adminAuth: AuthService, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.adminAuth.isAdminUserLoggedIn()){
      return true;
    } else{
      this.router.navigate(['/admin']);
      return false;
    }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if(this.adminAuth.isAdminUserLoggedIn()){
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }

  }
}
