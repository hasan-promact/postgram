import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { UserService } from '../core/user.service';
import { FirebaseUserModel } from '../core/user.model';
import { AuthService } from '../core/auth.service';

@Injectable()
export class UserResolver implements Resolve<FirebaseUserModel> {

  constructor(public userService: UserService,public authService: AuthService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot) : Promise<FirebaseUserModel> {

    let user = new FirebaseUserModel();

    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(res => {
        sessionStorage.setItem('uid', res.uid);
        if(res.providerData[0].providerId == 'password'){
          user.image = '';
          user.name = res.displayName;
          user.uid = res.uid;
          user.email = res.email;
          user.provider = res.providerData[0].providerId;
          this.authService.setLoggedIn(true,user.uid);
          return resolve(user);
        }
        else{
          user.image = res.photoURL;
          user.name = res.displayName;
          user.email = res.email;
          user.uid = res.uid;
          user.provider = res.providerData[0].providerId;
          this.authService.setLoggedIn(true,user.uid);
          return resolve(user);
        }
        
      }, err => {
        this.authService.setLoggedIn(false,'');
        this.router.navigate(['/login']);
        return reject(err);
      })
    })
  }
}
