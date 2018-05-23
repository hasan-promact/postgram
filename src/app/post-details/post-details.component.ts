import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PostService} from '../core/post.service';
import {ImagePost} from '../core/post-model';
import { NgForm } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  usrmail:string;
 validInput:boolean = false;
post:any;
id: number;
pgtitle:string = "Upload Your Image";
btnTxt:string = "Upload";
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,private router: Router,
    private postService: PostService, private tostr: ToastrService
    
  ) { }
  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
     
      if(file.type.split('/')[0] == "image") {
        this.validInput= true;
      }else{
        this.validInput= false;
      }
    }
    
  }
  ngOnInit(): void {
    this.resetForm();
    this.usrmail = sessionStorage.getItem('uid');
    this.route.params.subscribe(params => {
      if(params['id']){
       this.id = params['id'];
       this.postService.selectPost(this.id)
       this.validInput= true;
       this.pgtitle = "Update your post";
       this.btnTxt = "Update";
      
      }else{

      } 
    });
  }
  
  onSubmit(postForm: NgForm) {
    let fle: File;
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      fle = selectedFile;
    };
    if (postForm.value.$key == null){
      this.postService.insertPost(postForm.value, fle);
    }else{
      if(fle != undefined){
        this.postService.updatePostFile(postForm.value, fle);
      }else{
        this.postService.updatePost(postForm.value);
      }
      
    }
    this.resetForm(postForm);
    this.tostr.success('Submitted Succcessfully', 'Post uploaded');
    this.router.navigate(['/user']);
  }
  resetForm(postForm?: NgForm) {
    if (postForm != null)
      postForm.reset();
    this.postService.selectedPost = {
      $key: null,
      name: '',
      url : '',
      auther : '',
      isPublic : false,
      caption :'',
      timestamp  : new Date()
    }
  }

}
