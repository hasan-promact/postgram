import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../../core/auth.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    
    
  }
  isLoggedIn(){
    if(sessionStorage.getItem('uid') && sessionStorage.getItem('uid') !=''){
      return true;
    }else{
      return false;
    }
  }
  logout(){
    this.authService.doLogout()
    .then((res) => {
      this.router.navigate(['/login']);
    }, (error) => {
      console.log("Logout error", error);
    });
  }

}
