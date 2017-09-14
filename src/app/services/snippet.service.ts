import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SnippetService {

  constructor(private http: Http) { }

  // Get all snippets from the API
  getAllSnippets() {
    return this.http.get('/api/snippets')
    .map(res => res.json());
  }

  // Get code snippet by ID
  getByIdSnippet(id: String) {
    return this.http.get('/api/snippets/' + id)
    .map(res => res.json());
  } 

}
