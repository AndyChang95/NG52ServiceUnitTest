import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostInterfaceToken } from '../interface/injection.token';

describe('PostService', () => {
  let postService: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {provide: PostInterfaceToken, useClass: PostService}
      ]
    });

    postService = TestBed.get(PostInterfaceToken, PostService);
  });

  it('should be created', () => {
    expect(PostService).toBeTruthy();
  });
});
