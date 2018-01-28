import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostService } from './service/post.service';
import { PostInterfaceToken } from './interface/injection.token';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let appComponent: AppComponent;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;

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
});
