import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentChecked {

    private _logoImg: string;

    constructor() { }

    ngOnInit() {
        Observable
        .fromEvent(window, 'resize')
        .debounceTime(150)
        .subscribe((e : Event) => {
            this._setLogoImg(this._getViewport());
        });
    }

    ngAfterContentChecked() {
        this._setLogoImg(this._getViewport());
    }

    private _setLogoImg(viewport: any) {
        console.log(this._getViewport())
        if(viewport.width > 768)
            this._logoImg = `assets/marca.png`;
        else
            this._logoImg = `assets/marca_mobile.png`;
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
