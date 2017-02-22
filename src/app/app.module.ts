import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GeralService } from './geral.service';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {Ng2PageScrollModule} from 'ng2-page-scroll';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2PageScrollModule.forRoot()
  ],
  providers: [GeralService],
  bootstrap: [AppComponent]
})
export class AppModule { }
