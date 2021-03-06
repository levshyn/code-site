import { Injectable } from '@angular/core';

interface Serializable<T> {
  deserialize(input: any): T;
}

@Injectable()
export class SnippetModelService implements Serializable<SnippetModelService> {
  id: string;
  thema: string;
  title: string;
  method: string;
  language: string;
  lib: string;
  codeSnippet: string;
  link: string;
  visible: string;
  text: string;
  codeTitle: string;
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

    // DEBUG
    // console.log('methode deserialize, input variable');
    // Object.keys(input).forEach(key => {
    //  console.log(key + ': ' + input[key]);
    // });


    if (input.hasOwnProperty('id')) {
      this.id = input.id;
    } else {
      this.id = '';
    }
    if (input.hasOwnProperty('thema')) {
      this.thema = input.thema;
    } else {
      this.thema = '';
    }
    if (input.hasOwnProperty('title')) {
      this.title = input.title;
    } else {
      this.title = '';
    }
    if (input.hasOwnProperty('method')) {
      this.method = input.method;
    } else {
      this.method = '';
    }
    if (input.hasOwnProperty('language')) {
      this.language = input.language;
    } else {
      this.language = '';
    }
    if (input.hasOwnProperty('lib')) {
      this.lib = input.lib;
    } else {
      this.lib = '';
    }
    if (input.hasOwnProperty('codeSnippet')) {
      this.codeSnippet = input.codeSnippet;
    } else {
      this.codeSnippet = '';
    }
    if (input.hasOwnProperty('link')) {
      this.link = input.link;
    } else {
      this.link = '';
    }
    if (input.hasOwnProperty('visible')) {
      this.visible = input.visible;
    } else {
      this.visible = '';
    }
    if (input.hasOwnProperty('text')) {
      this.text = input.text;
    } else {
      this.text = '';
    }
    if (input.hasOwnProperty('codeTitle')) {
      this.codeTitle = input.codeTitle;
    } else {
      this.codeTitle = '';
    }

    return this;
  }
}
