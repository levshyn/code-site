import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SnippetService {

  private messageSource = new BehaviorSubject<string>(null);
  currentMessage = this.messageSource.asObservable();

  private _lastParam: string = '';

  constructor(private http: Http) { }

  // Get all snippets from the API
  getAllSnippets(query: string = '') {
    if (query != '') {
      query = '?' + query;
    }
    return this.http.get('/api/snippets/' + query)
      .map(res => res.json());
  }

  // Get code snippet by ID
  getByIdSnippet(id: string) {
    return this.http.get('/api/snippets/' + id)
      .map(res => res.json());
  }

  changeMessage(message: string) {
      this.messageSource.next(message);
    console.log('SnippetService, changeMessage(): ');
    console.log(message);
  }

  changeParam(param: string) {
    this._lastParam = param;
  }

  get lastParam(): string {
    return this._lastParam;
  }

}
