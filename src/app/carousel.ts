import { Component, OnInit, ViewChild,
    ElementRef, Renderer, NgZone, Inject } from '@angular/core';
import { DomHandler } from './dom-handler.service';
import { GeralService, ThematicGroup, GT, News } from './geral.service';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'carousel',
    template: `
    <div class="container-all">
        <a class="btn left" (click)="previous()"><</a>

        <div class="news-container">
          <a class="news" *ngFor="let n of news">
            <h1>{{ allNews[n].title }}</h1>
            <p [innerHTML]="allNews[n].text"></p>
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
        background: rgb(170, 170, 170);
        font-size: 30px;
        padding: 95px 10px;
        cursor: pointer;
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
        margin: auto 10px;
        cursor: pointer;
      }

      .news h1 {
        font-size: 10px;
      }

    `],
    providers: [DomHandler]
})
export class CarouselComponent implements OnInit {

  private news: Array<number>;
  private allNews: Array<News>;

  constructor(private _geral: GeralService) {

    this.news = [];

    this._geral.getNews()
      .subscribe((news: Array<News>) => {
        this.allNews = news;

        this.allNews.forEach((news: News) => {
          news.text = news.text.substring(0, 200)+'...';
        });

        for(let i = 0; i < 3 && i < this.allNews.length; ++i ) {
          this.news.push(i);
        }
      });

  }

  private next() {
    for(let i = 0; i < this.news.length; i++) {
      if(this.news[i] < this.allNews.length-1) {
        this.news[i]++;
      } else {
        this.news[i] = 0;
      }
    }
  }

  private previous() {
    for(let i = 0; i < this.news.length; i++) {
      if(this.news[i] > 0) {
        this.news[i]--;
      } else {
        this.news[i] = this.allNews.length-1;
      }
    }
  }

  ngOnInit() { }

}
