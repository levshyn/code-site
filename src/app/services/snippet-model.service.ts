import { Injectable } from '@angular/core';

interface Serializable<T> {
  deserialize(input: any): T;
}

@Injectable()
export class SnippetModelService implements Serializable<SnippetModelService> {
// export class SnippetModelService {
  id: string;
  thema: string;
  title: string;
  method: string;
  language: string;
  lib: string;
  codeSnippet: string;
  link: string;
/*
  constructor(id: string, thema: string, title: string,
    method: string, language: string, lib: string,
    codeSnippet: string, link: string) {
    this.id = id;
    this.thema = thema;
    this.title = title;
    this.method = method;
    this.language = language;
    this.lib = lib;
    this.codeSnippet = codeSnippet;
    this.link = link;
  }
*/
  deserialize(input: any): SnippetModelService {
    this.id = input.id;
    this.thema = input.thema;
    this.title = input.title;
    this.method = input.method;
    this.language = input.language;
    this.lib = input.lib;
    this.codeSnippet = input.codeSnippet;
    this.link = input.link;
    return this;
  }
}
