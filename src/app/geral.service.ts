import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';

export interface GT {
    name: string,
    syllabus: string,
    coordinators: string
}

export interface ThematicGroup {
    name: string,
    tgs: Array<GT>;
}

export interface News {
    title: string;
    text: string;
    created_at: string;
}

@Injectable()
export class GeralService {

    constructor(private _http: Http) { }

    public getGts(): Observable<Array<ThematicGroup>> {
        return this._http.get(`http://localhost/seminario-ccsa-old/index.php/api/tgs`)
            .map((res: any) => { return res.json().data });
    }

    public getNews(): Observable<Array<News>> {
        return this._http.get(`http://localhost/seminario-ccsa-old/index.php/api/news`)
            .map((res: any) => { return res.json().data });
    }

}
