import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators'
import {Post} from "./post.model";
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isLoading = false;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.isLoading = true;
    this.postService.fetchPosts().subscribe(posts =>{
      this.isLoading = false;
      this.loadedPosts = posts
      }
    );
  }

  onCreatePost(postData: Post) {
    this.postService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
      this.isLoading = true;
      this.postService.fetchPosts().subscribe(posts =>{
      this.isLoading = false;
      this.loadedPosts = posts
  })
  }

  onClearPosts() {
    // Send Http request
    this.postService.clearPosts().subscribe(()=>{
      this.loadedPosts = [];
    });
  }


}
