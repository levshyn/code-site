import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { SnippetService } from '../services/snippet.service';

import { SnippetModelService } from '../services/snippet-model.service';

@Component({
  selector: 'app-code-pages',
  templateUrl: './code-pages.component.html',
  styleUrls: ['./code-pages.component.scss']
})
export class CodePagesComponent implements OnInit {
  aloneSnippet: Object;
  codeSnippet: string = '';
  snippetModel: SnippetModelService;
  snippetId: string;
  param = null;
  // id: number;
  // private sub: any;
  rerender: boolean;

  constructor(private snippetService: SnippetService, private route: ActivatedRoute,
      private router: Router, private cdRef: ChangeDetectorRef, private zone: NgZone) {
    // this.snippetId = route.snapshot.params['id'];

    this.route.params.subscribe(params => {
      this.param = params['id'];
      console.log('this.param = ', this.param);
      this.snippetId = this.param;
      // Retrive alone snippet by ID from API
      this.snippetService.getByIdSnippet(this.snippetId).subscribe(snippet => {
        this.aloneSnippet = snippet;
        this.codeSnippet = snippet.codeSnippet;
        console.log("snippet: ");
        console.log(snippet);
        console.log("this.aloneSnippet: ");
        console.log(this.aloneSnippet);
        console.log("this.aloneSnippet.title: ");
        console.log(snippet.codeSnippet);
/*
        this.snippetModel = new SnippetModelService(snippet.id, snippet.thema, snippet.title,
          snippet.method, snippet.language, snippet.lib, snippet.codeSnippet, snippet.link);
*/
          this.snippetModel = new SnippetModelService().deserialize(snippet);
          this.doRerender();
      });

    });

  }

  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.rerender = false;
  }

  ngOnInit() {

/*
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.router.navigate(['code', this.id]);
    });
*/

/*
this.route.params.subscribe(params => {
  this.param = params['id'];
  console.log('this.param = ', this.param);
  this.snippetId = this.param;
  this.doRerender();
  this.zone.run(() => {
    console.log('enabled time travel');
  });
  // this.doRerender();
  // this.router.navigate(['home']);
  this.router.navigateByUrl('/code/' + this.param);
  this.router.navigate(['code', this.param])
    .then(() => {
    // window.location.reload()
    console.log("!!!");
    this.doRerender();
    });
  // this.router.navigateByUrl('/code/' + this.param);
  // this.router.navigate(['']);

  // this.route.snapshot.data['id'];

});
*/

  }

}
