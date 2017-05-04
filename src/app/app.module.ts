import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GeralService } from './geral.service';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel';
import { CarouselVideosComponent, SafePipe } from './carousel-videos';

@NgModule({
  declarations: [
    AppComponent, CarouselComponent,
    CarouselVideosComponent, SafePipe
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    ReactiveFormsModule
  ],
  providers: [GeralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
