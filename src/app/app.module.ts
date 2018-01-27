import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PostInterfaceToken } from './interface/injection.token';
import { PostService } from './service/post.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {provide: PostInterfaceToken, useClass: PostService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
