import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../model/post.model';
import { PostInterface } from './interface/post.interface';
import { PostInterfaceToken } from './interface/injection.token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  posts$: Observable<Post[]> = this.postService.listPosts$();

  constructor(@Inject(PostInterfaceToken) private postService: PostInterface) {
  }

  /**
   * Add post click handler
   */
  onAddPostClick() {
    const post: Post = {
      'title' : this.title,
      'author' : 'Sam'
    };

    this.postService.addPost(post);
  }

  /**
   * List post click handler
   */
  onListPostsClick() {
    this.posts$ = this.postService.listPosts$();
  }
}
