import { Component, OnInit, ViewChild,
    ElementRef, Renderer, NgZone, Inject } from '@angular/core';
import { DomHandler } from './dom-handler.service';
import { GeralService, ThematicGroup, GT, News } from './geral.service';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var jQuery:any;

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
    private _loginForm: FormGroup;


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

        /** LOGIN FORM */
        this._loginForm = this._formBuilder.group({
            mail: ['', Validators.compose([Validators.required]) ],
            password: ['', Validators.compose([Validators.required]) ]
        })
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

                if(this._markedNews)
                this._markedNews.text =
                    this._markedNews.text.substring(0, 200)+'...';

                if(news[1]) this._othersNews.push(news[1]);
                if(news[2]) this._othersNews.push(news[2]);

                for(let i = 0; i < this._othersNews.length; ++i)
                    this._othersNews[i].text = this._othersNews[i].text.substring(0, 260)+'...';
            }
        })
    }

    private loginFromMenu() {
        this.toggleMenu();
        this._openLogin();
    }

    private goToFromMenu(selector: string) {
        this.toggleMenu();
        setTimeout(() => {
            this._gotTo(selector);
        }, 600);
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

    private _sendMessage(e) {
        if(!this._contactForm.valid) {
            for(let a in this._contactForm.controls){
                this._contactForm.controls[a].markAsTouched();
                this._contactForm.controls[a].markAsDirty();
            }
        } else {
            this._geralService.sendMessage(this._contactForm.get('name').value,
                this._contactForm.get('mail').value, this._contactForm.get('message').value,
                this._contactForm.get('subject').value)
                .subscribe((a) => {
                    if(a.status === 'success') {
                        alert('Mensagem enviada com sucesso.')
                        this._contactForm.reset();
                    } else {
                        alert(a.message)
                    }
                })
        }

        return false;
    }

    private _login() {
        // code here
    }

    private _register() {
        if(!this._registerForm.valid) {
            for(let a in this._registerForm.controls){
                this._registerForm.controls[a].markAsTouched();
                this._registerForm.controls[a].markAsDirty();
            }
        } else {
            this._geralService.createUser(this._registerForm.get('name').value,
            this._registerForm.get('mail').value, this._registerForm.get('cpf').value,
            this._registerForm.get('category').value, this._registerForm.get('institution').value,
            this._registerForm.get('phone').value, this._registerForm.get('password').value,
            this._registerForm.get('repeatPassword').value)
                .subscribe((a) => {
                    if(a.status === 'success') {
                        alert('Você foi cadastrado com sucesso!');
                        this._registerForm.reset();
                        this._openLogin();
                    } else {
                        alert(a.message)
                    }
                }, (e) => {
                    alert(e.json().message)
                })
        }

        return false;
    }

    @ViewChild('mainContainer')
    private mainContainer: ElementRef;

    @ViewChild('downloads')
    private downloads: ElementRef;

    private _gotTo(selector: string) {
        $('main').stop()
            .animate({ scrollTop: $(selector)
            .offset().top-120 }, 600, 'swing');
    }

}
