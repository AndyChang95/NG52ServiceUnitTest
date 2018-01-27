import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostInterfaceToken } from '../interface/injection.token';
import { Post } from '../../model/post.model';
import { environment } from '../../environments/environment';
import { PostInterface } from '../interface/post.interface';

describe('PostService', () => {
  let postService: PostInterface;
  let mockHttpClient: HttpTestingController;

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
    mockHttpClient = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(PostService).toBeTruthy();
  });

  it(`should list all posts`, () => {
    /** act */
    const expected: Post[] = [
      {
        id: 1,
        title: 'Design Pattern',
        author: 'Dr. Eric Gamma'
      }
    ];

    postService.listPosts$().subscribe(posts => {
      /** assert */
      expect(posts).toEqual(expected);
    });

    /** arrange */
    const mockResponse: Post[] = [
      {
        id: 1,
        title: 'Design Pattern',
        author: 'Eric Gamma'
      }
    ];

    mockHttpClient.expectOne({
      url: `${environment.apiServer}/posts`,
      method: 'GET'
    }).flush(mockResponse);
  });

  it(`should add post`, () => {
    /** act */
    const expected: Post = {
      id: 1,
      title: 'OOP',
      author: 'Sam'
    };

    postService.addPost(expected).subscribe(post => {
      /** assert */
      expect(post).toBe(expected);
    });

    /** arrange */
    mockHttpClient.expectOne({
      url: `${environment.apiServer}/posts`,
      method: 'POST'
    }).flush(expected);
  });

  afterEach(() => {
    mockHttpClient.verify();
  });
});
