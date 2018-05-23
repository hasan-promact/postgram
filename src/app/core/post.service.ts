import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import {ImagePost} from './post-model';
import { Router } from '@angular/router';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PostService {
postList: AngularFireList<any>;
private firebasestorage: any;
  selectedPost: ImagePost = new ImagePost();
  constructor(private firebase :AngularFireDatabase, fbApp: FirebaseApp,private router: Router ) { this.getData(); this.firebasestorage = fbApp.storage();}
 
  getData(){
  
    this.postList = this.firebase.list('posts', ref => ref.orderByChild('isPublic').equalTo(true));
    return this.postList;
  }
  getDataByUser(usr:string){
  
    this.postList = this.firebase.list('posts', ref => ref.orderByChild('auther').equalTo(usr));;
    return this.postList;
  }
 selectPost(key){
   var item:any;
    item = this.firebase.object('posts/' + key);
   item.valueChanges().subscribe(item => {
      if(item.auther == sessionStorage.getItem('uid')){
       this.selectedPost.$key= key;
       this.selectedPost.name= item.name;
       this.selectedPost.url= item.url;
       this.selectedPost.auther= item.auther;
       this.selectedPost.isPublic= item.isPublic;
       this.selectedPost.caption= item.caption;
       }else{
          this.router.navigate(['/user']);
       }
    });
 }
  insertPost(post : ImagePost,file:File)
  {
    let imgname = new Date().getTime() + file.name;
    this.firebasestorage.ref('posts/' + imgname).put(file).then(
                snapshot => {
                    post.url = snapshot.downloadURL;
                    post.imgname= imgname;
                    this.postList.push({
      name : post.name,
      url : post.url,
      auther : post.auther,
      imgname: post.imgname,
      isPublic : post.isPublic,
      caption :post.caption,
      modified :Date.now()
    });
                });
    
  }
 
  updatePostFile(post : ImagePost,file:File){
    let imgname = new Date().getTime() + file.name;
    this.firebasestorage.ref('posts/' + imgname).put(file).then(
                snapshot => {
                    post.url = snapshot.downloadURL;
                    post.imgname= imgname;
    this.postList.update(post.$key,
      {
        name : post.name,
        url : post.url,
        imgname: post.imgname,
        //auther : post.auther,
        isPublic : post.isPublic,
        caption :post.caption,
        modified :Date.now()
      });
        });
  }
  updatePost(post : ImagePost){
    
    this.postList.update(post.$key,
      {
        name : post.name,
       // url : post.url,
        //auther : post.auther,
        isPublic : post.isPublic,
        caption :post.caption,
        modified :Date.now()
      });
  }
 
  deletePost(post : ImagePost){
    
var desertRef = this.firebasestorage.ref().child('posts/'+ post.imgname);
// Delete the file
desertRef.delete().then(function() {
  console.log("Image Deleted");
}).catch(function(error) {
  console.log(error);
});
this.postList.remove(post.$key);
  }
}
