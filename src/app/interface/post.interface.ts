import { Observable } from 'rxjs/Observable';
import { Post } from '../../model/post.model';

export interface PostInterface {
  addPost(post: Post): void;
  listPosts$(): Observable<Post[]>;
}
