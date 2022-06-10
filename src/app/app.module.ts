import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoryComponent } from './stories/story.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieComponent } from './movies/movie.component';
import { BookComponent } from './books/book.component';
import { ContactUsGuard } from './contact-us/contact-us.guard';

@NgModule({
  declarations: [
    AppComponent,
    StoryComponent,
    ContactUsComponent,
    MovieComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'stories', component: StoryComponent},
      {path: 'contact-us', component: ContactUsComponent},
      {path: 'movies', component: MovieComponent},
      {path: 'books', component: BookComponent},
      {path: '**', component: StoryComponent}
    ]),
    BrowserAnimationsModule,
    
  ],
  providers: [MatSnackBar, ContactUsGuard],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
