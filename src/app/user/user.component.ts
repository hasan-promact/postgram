import { Component, OnInit } from '@angular/core';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseUserModel } from '../core/user.model';
import { PostService } from '../core/post.service';
import { ImagePost } from '../core/post-model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  postList: ImagePost[];
  loggedinUsr:string;
  isEdit:boolean;
  constructor(
    private postService: PostService,
    private authService:AuthService,
    private router: Router, 
    public userService: UserService,
    private tostr: ToastrService,
    private route: ActivatedRoute
  ) { }


 
  onEdit(pst: ImagePost) {
    this.router.navigate(['/edit-post', pst.$key]);
  }
 
  onDelete(key: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.postService.deletePost(key);
      this.tostr.warning("Deleted Successfully", "Post");
    }
  }
  
  ngOnInit(): void {
    
    this.loggedinUsr = sessionStorage.getItem('uid');
    var x = this.postService.getDataByUser(this.loggedinUsr);
    x.snapshotChanges().subscribe(item => {
      this.postList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.postList.push(y as ImagePost);
      });
    });
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
       
      }
    })
  }
  
  

}
