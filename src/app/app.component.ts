import { Component, OnInit, ViewChild,
    ElementRef, Renderer, NgZone } from '@angular/core';
import { DomHandler } from './dom-handler.service';
import { GeralService, ThematicGroup, GT, News } from './geral.service';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [DomHandler]
})
export class AppComponent implements OnInit{

    @ViewChild('mailInput')
    private _mailInput: ElementRef;
    private _isLoginModalActive: boolean;
    private _gtsleft: Array<ThematicGroup>;
    private _gtsright: Array<ThematicGroup>;
    private _markedNews: News;
    private _othersNews: Array<News>;

    private _registerForm: FormGroup;
    private _contactForm: FormGroup;

    constructor(
        private _domHandler: DomHandler,
        private _renderer: Renderer,
        private _ngZone: NgZone,
        private _geralService: GeralService,
        private _formBuilder : FormBuilder
    ) {
        this._isLoginModalActive = false;
        this._gtsleft = [];
        this._gtsright = [];
        this._markedNews = { title: '', text: '', created_at: ''};
        this._othersNews = [];

        /** REGISTER FORM */
        this._registerForm = this._formBuilder.group({
            name: ['', Validators.compose([Validators.required]) ],
            mail: ['', Validators.compose([Validators.required]) ],
            cpf: ['', Validators.compose([Validators.required]) ],
            category: ['', Validators.compose([Validators.required]) ],
            institution: ['', Validators.compose([Validators.required]) ],
            phone: ['', Validators.compose([Validators.required]) ],
            password: ['', Validators.compose([Validators.required]) ],
            repeatPassword: ['', Validators.compose([Validators.required]) ],
        });

        /** CONTACT FORM */
        this._contactForm = this._formBuilder.group({
            name: ['', Validators.compose([Validators.required]) ],
            mail: ['', Validators.compose([Validators.required]) ],
            subject: ['', Validators.compose([Validators.required]) ],
            message: ['', Validators.compose([Validators.required]) ]
        });
    }

    ngOnInit() {
        this._geralService.getGts().
        subscribe((gts: Array<ThematicGroup>) => {
            let i;
            for(i = 0; i < gts.length/2+1; ++i)
                this._gtsleft.push(gts[i]);
            for( ; i < gts.length; ++i)
                this._gtsright.push(gts[i]);
        });

        this._geralService.getNews()
        .subscribe((news: Array<News>) => {
            if(news.length > 0) {
                this._markedNews = news[0];

                if(news[1]) this._othersNews.push(news[1]);
                if(news[2]) this._othersNews.push(news[2]);
            }
        })
    }

    private toggleMenu() {
        if(this._domHandler.hasClass(document.querySelector('body'), 'menu')){
            this._domHandler.removeClass(document.querySelector('body'), 'menu');
            this._domHandler.removeClass(document.querySelector('body'), 'overlay');
        } else {
            this._domHandler.addClass(document.querySelector('body'), 'menu');
            this._domHandler.addClass(document.querySelector('body'), 'overlay');
        }
    }

    private _handleOverlayClick() {
        if(this._domHandler.hasClass(document.querySelector('body'), 'menu')){
            this._domHandler.removeClass(document.querySelector('body'), 'menu');
            this._domHandler.removeClass(document.querySelector('body'), 'overlay');
        }
    }

    private _openLogin() {
        this._isLoginModalActive = !this._isLoginModalActive;

        this._ngZone.onMicrotaskEmpty.subscribe(() => {
            if(this._isLoginModalActive)
                this._renderer.invokeElementMethod(
                    this._mailInput.nativeElement, 'focus');
        });
    }

    private _getViewport(): any {
        // from primeng project
        let win = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            w = win.innerWidth || e.clientWidth || g.clientWidth,
            h = win.innerHeight || e.clientHeight || g.clientHeight;

        return { width: w, height: h };
    }

    private openSub(a: string) {

        if(!this._domHandler.hasClass(document.querySelector('#'+a), 'open')) {
            for(let i = 0; i < document.querySelectorAll('ul div').length; ++i)
                this._domHandler.removeClass(document.querySelectorAll('ul div').item(i), 'open');
           this._domHandler.addClass(document.querySelector('#'+a), 'open')
        }else
           this._domHandler.removeClass(document.querySelector('#'+a), 'open')

    }

}
