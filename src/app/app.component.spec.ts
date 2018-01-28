import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from './service/post.service';
import { PostInterfaceToken } from './interface/injection.token';
import { DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { PostInterface } from './interface/post.interface';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let postService: PostInterface;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        {provide: PostInterfaceToken, useClass: PostService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.componentInstance;
    debugElement = fixture.debugElement;
    htmlElement = debugElement.nativeElement;
    fixture.detectChanges();

    postService = TestBed.get(PostInterfaceToken, PostService);
  }));

  it('should create the app', async(() => {
    expect(appComponent).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(appComponent.title).toEqual('app');
  }));

  it('should render title in a h1 tag', async(() => {
    expect(htmlElement.querySelector('h1').textContent).toContain('Welcome to app!');
  }));

  it(`should list posts`, () => {
    const expected$ = Observable.of([
      {
        id: 1,
        title: 'Design Pattern',
        author: 'Dr. Eric Gamma'
      }
    ]);

    /** arrange */
    spyOn(postService, 'listPosts$').and.returnValue(expected$);
    /** act */
    appComponent.onListPostsClick();
    /** assert */
    expect(appComponent.posts$).toEqual(expected$);
  });

  it(`should add post`, () => {
    const expected$ = Observable.of(
      {
        id: 1,
        title: 'Design Pattern',
        author: 'Dr. Eric Gamma'
      }
    );

    /** arrange */
    const spy = spyOn(postService, 'addPost').and.returnValue(expected$);
    /** act */
    appComponent.onAddPostClick();
    /** assert */
    expect(spy).toHaveBeenCalled();
  });
});
