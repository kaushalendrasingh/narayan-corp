
import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad,Route,  ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild
 {
  constructor(private auth : AuthService, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot): boolean{
    if(this.auth.isUserLoggedIn()){
      return true;
    } else{
      this.router.navigate(['/']);
      return false;
    }

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(this.auth.isUserLoggedIn()){
        return true;
      } else{
        this.router.navigate(['/']);
        return false;
      }

  }

}
