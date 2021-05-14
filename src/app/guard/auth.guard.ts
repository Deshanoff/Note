
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GetuidComponent } from '../model/getuid/getuid.component';
import { AuthenticationService } from '../serices/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  static v:boolean=false;
  count:number=2;
  constructor(private router:Router,
      private afauth:AuthenticationService
    ){

  }
   canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   const user=localStorage.getItem('user');
   console.log("yyyyyyyyyyyyyyyyyyyy");

   if(user!=='null' &&user && user!==null){
    console.log("zzzzzzzzzzzzz");
     let currentUser=JSON.parse(user);
     console.log(currentUser.uid);
     GetuidComponent.uid=currentUser.uid;

     //console.log(currentUser.emailVerified);
    if(currentUser.emailVerified){
      AuthenticationService.ev=true;
    }
      if(AuthenticationService.ev){
       console.log("xxxxxxxxxxxxxxxxxxxxx");
       return true;
     }
     else{
       this.router.navigateByUrl('/register');
       return false;
      }
   }
   this.router.navigateByUrl('/login');
   return false;

  }


}
