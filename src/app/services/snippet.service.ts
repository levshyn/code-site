import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SnippetService {

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

}
