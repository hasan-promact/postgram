import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import {ImagePost} from './post-model';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class PostService {
postList: AngularFireList<any>;
private firebasestorage: any;
  selectedPost: ImagePost = new ImagePost();
  constructor(private firebase :AngularFireDatabase, fbApp: FirebaseApp ) { this.getData(); this.firebasestorage = fbApp.storage();}
 
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
       this.selectedPost.$key= key;
       this.selectedPost.name= item.name;
       this.selectedPost.url= item.url;
       this.selectedPost.auther= item.auther;
       this.selectedPost.isPublic= item.isPublic;
       this.selectedPost.caption= item.caption;
    });
 }
  insertPost(post : ImagePost,file:File)
  {
    this.firebasestorage.ref('posts/' + post.name).put(file).then(
                snapshot => {
                    post.url = snapshot.downloadURL;
                    this.postList.push({
      name : post.name,
      url : post.url,
      auther : post.auther,
      isPublic : post.isPublic,
      caption :post.caption,
      timestamp :new Date()
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
        caption :post.caption
      });
  }
 
  deletePost($key : string){
    this.postList.remove($key);
  }
}
