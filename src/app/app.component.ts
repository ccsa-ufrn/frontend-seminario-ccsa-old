import { Component, OnInit, ViewChild,
    ElementRef, Renderer, NgZone } from '@angular/core';
import { DomHandler } from './dom-handler.service';
import { GeralService, ThematicGroup, GT } from './geral.service';
import { Observable } from 'rxjs/Rx';

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

    constructor(
        private _domHandler: DomHandler,
        private _renderer: Renderer,
        private _ngZone: NgZone,
        private _geralService: GeralService
    ) {
        this._isLoginModalActive = false;
        this._gtsleft = [];
        this._gtsright = [];
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
