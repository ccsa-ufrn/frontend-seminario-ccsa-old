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

@Injectable()
export class GeralService {

    constructor(private _http: Http) { }

    public getGts(): Observable<Array<ThematicGroup>> {
        return this._http.get(`assets/tgs.json`)
            .map((res: any) => { return res.json().data });
    }

}
