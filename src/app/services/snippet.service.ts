import { Injectable, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SnippetService {

  private messageSource = new BehaviorSubject<string>(null);
  currentMessage = this.messageSource.asObservable();

  private sideNavElSource = new BehaviorSubject<ElementRef>(null);
  currentSideNavEl$ = this.sideNavElSource.asObservable();


  private _lastParam: string = '';
  private _lastUrl: string = '';
  private _currentUrl: string = '';

  constructor(private http: Http) { }

  // Get all snippets from the API
  getAllSnippets(query: string = ''): any {
    if (query != '') {
      query = '?' + query;
    }
    return this.http.get('/api/snippets/' + query)
      .map(res => res.json());
  }

  // Get code snippet by ID
  getByIdSnippet(id: string): any {
    return this.http.get('/api/snippets/' + id)
      .map(res => res.json());
  }

  changeMessage(message: string): void {
    this.messageSource.next(message);
  }

  changeSideNavEl(elementRef: ElementRef): void {
    this.sideNavElSource.next(elementRef);
  }

  changeParam(param: string): void {
    this._lastParam = param;
  }

  changeUrl(url: string): void {
    this._lastUrl = this._currentUrl;
    this._currentUrl = url;
  }

  get lastParam(): string {
    return this._lastParam;
  }

  get currentUrl(): string {
    return this._currentUrl;
  }

  get lastUrl(): string {
    return this._lastUrl;
  }

}
