import { Component, OnInit, ViewChild,
    ElementRef, Renderer, NgZone } from '@angular/core';
import { DomHandler } from './dom-handler.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [DomHandler]
})
export class AppComponent implements OnInit{

    @ViewChild('mailInput')
    private _mailInput: ElementRef;


    private _isLoginModalActive: boolean;

    constructor(
        private _domHandler: DomHandler,
        private _renderer: Renderer,
        private _ngZone: NgZone
    ) {
        this._isLoginModalActive = false;
    }

    ngOnInit() { }

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

}
