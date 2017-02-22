import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
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
        return this._http.get(`https://seminario.ccsa.ufrn.br/index.php/api/tgs`)
            .map((res: any) => { return res.json().data });
    }

    public getNews(): Observable<Array<News>> {
        return this._http.get(`https://seminario.ccsa.ufrn.br/index.php/api/news`)
            .map((res: any) => { return res.json().data });
    }

    public sendMessage(name: string, email: string, message: string, subject: string): Observable<any> {
        let body = new URLSearchParams();
        body.set('name', name);
        body.set('email', email);
        body.set('subject', subject);
        body.set('message', message);
        return this._http.post(`https://seminario.ccsa.ufrn.br/index.php/api/message`, body)
            .map((res: any) => { return res.json() });;
    }

    public createUser(name: string, email: string,
        cpf: string, category: string, institution: string,
        phone: string, password: string, repassword: string): Observable<any> {
        let body = new URLSearchParams();
        body.set('name', name);
        body.set('email', email);
        body.set('cpf', cpf);
        body.set('type', category);
        body.set('institution', institution);
        body.set('phone', phone);
        body.set('pass', password);
        body.set('pass-repeate', repassword);
        return this._http.post(`https://seminario.ccsa.ufrn.br/index.php/api/new_user`, body)
            .map((res: any) => { return res.json() });;
    }

}
