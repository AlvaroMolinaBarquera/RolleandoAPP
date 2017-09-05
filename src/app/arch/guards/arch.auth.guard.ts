import { Injectable } from '@angular/core';
import { ArchActiveUserService } from './../services/arch.active-user.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 
@Injectable()
export class ArchAuthGuard implements CanActivate {
 
    constructor(
      private router: Router,
      private activeUserService: ArchActiveUserService
    ) { }
 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.activeUserService.getActiveUser()) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login']);
        return false;
    }
}