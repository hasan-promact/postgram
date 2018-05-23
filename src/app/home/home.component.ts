import { Component, OnInit } from '@angular/core';
import { PostService } from '../core/post.service';
import { ImagePost } from '../core/post-model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../core/auth.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  postList: ImagePost[];
  loggedinUsr:string;
  isEdit:boolean;
  constructor(private postService: PostService,private authService:AuthService,private router: Router, private tostr: ToastrService) { }

  ngOnInit() {
    this.loggedinUsr = sessionStorage.getItem('uid');
    var x = this.postService.getData();
    
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.postList.push(y as ImagePost);
      });
    });
  }
 
  

}
