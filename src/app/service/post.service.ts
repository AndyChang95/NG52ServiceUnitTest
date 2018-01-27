import { Injectable } from '@angular/core';
import { PostInterface } from '../interface/post.interface';
import { Post } from '../../model/post.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService implements PostInterface {
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Add new post
   * @param {Post} post
   */
  addPost(post: Post): Observable<Post> {
    return this.httpClient
      .post<Post>(`${environment.apiServer}/posts`, post);
  }

  /**
   * List all posts
   * @returns {Observable<Post[]>}
   */
  listPosts$(): Observable<Post[]> {
    return this.httpClient
      .get<Post[]>(`${environment.apiServer}/posts`)
      .map(posts => this.addDrToAuthor(posts));
  }

  /**
   * Add 'Dr.' before author
   * @param {Post[]} posts
   * @returns {Post[]}
   */
  private addDrToAuthor(posts: Post[]): Post[] {
    return posts.map(post => ({
      id: post.id,
      title: post.title,
      author: `Dr. ${post.author}`
    }));
  }
}
