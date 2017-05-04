import { Component, OnInit, ViewChild,
    ElementRef, Renderer, NgZone, Inject,
    Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomHandler } from './dom-handler.service';
import { Observable } from 'rxjs/Rx';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safeUrl' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
    selector: 'carousel-videos',
    template: `
    <div class="container-all">
        <a class="btn left" (click)="previous()"><</a>

        <!--<div class="news-container">
          <a class="news" *ngFor="let n of news" (click)="abrirDialogo(allNews[n].id)"
            (keyup.enter)="abrirDialogo(allNews[n].id)">
            <h1>{{ allNews[n].title }}</h1>
            <p [innerHTML]="allNews[n].text"></p>
          </a>
        </div>-->
        <div class="news-container">
          <a class="news" *ngFor="let n of news">
              <iframe width="auto" height="230"  [src]="('https://www.youtube.com/embed/' + allNews[n]) | safeUrl" frameborder="0" allowfullscreen></iframe>
          </a>
        </div>

        <a class="btn right" (click)="next()">></a>
      </div>
    `,
    styles: [`

      .container-all {
        postion: relative;
        height: 230px;
        overflow: hidden;
        margin-top: 40px;
      }

      .btn {
        position: absolute;
        top: 0;
        margin-top: 100px;
        display: block;
        width: 36px;
        font-size: 30px;
        padding: 95px 10px;
        cursor: pointer;
        background: #4CAF50;
        color: white;
      }

      .btn:hover, .btn:focus {
        background: #46a049;
      }

      .btn:active {
        background: #4CAF50;
      }

      .btn.left {
        left: 0;
      }

      .btn.right {
        right: 0;
      }

      .news-container {
        display: flex;
        margin: auto 46px;
      }

      .news {
        display: block;
        width: calc( 100% / 3 );
        padding: 10px 10px;
      }

    `],
    providers: [DomHandler]
})
export class CarouselVideosComponent {

  private news: Array<number>;
  private allNews: Array<string>;

  constructor(private sanitizer: DomSanitizer) {

    this.news = [];

    this.allNews = ['J7GhZPKWAY0','bBATqnFymd4','Xq0GvzB1WRA','Mzv9h4nUB3k'];

    for(let i = 0; i < 3 && i < this.allNews.length; ++i ) {
      this.news.push(i);
    }

  }

  next() {
    for(let i = 0; i < this.news.length; i++) {
      if(this.news[i] < this.allNews.length-1) {
        this.news[i]++;
      } else {
        this.news[i] = 0;
      }
    }
  }

  previous() {
    for(let i = 0; i < this.news.length; i++) {
      if(this.news[i] > 0) {
        this.news[i]--;
      } else {
        this.news[i] = this.allNews.length-1;
      }
    }
  }

}

