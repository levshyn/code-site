import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';

import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { SnippetService } from '../services/snippet.service';

import { SnippetModelService } from '../services/snippet-model.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-code-pages',
  templateUrl: './code-pages.component.html',
  styleUrls: ['./code-pages.component.scss']
})
export class CodePagesComponent implements OnInit, OnDestroy {
  aloneSnippet: Object;
  codeSnippet: string = '';
  snippetModel: SnippetModelService;
  snippetId: string;
  private param: string = '';
  // id: number;
  // private sub: any;
  rerender: boolean;
  componentDestroyed$: Subject<boolean> = new Subject();
  messageFirstParam: string;

  constructor(private snippetService: SnippetService, private route: ActivatedRoute,
      private router: Router, private cdRef: ChangeDetectorRef, private zone: NgZone) {
    // this.snippetId = route.snapshot.params['id'];

    // this.param = '';

    /*
    this.snippetService.currentMessage
      .takeUntil(this.componentDestroyed$)
      .subscribe(message => {
        if (message !== null) {
          this.messageFirstParam = message;
        }
      });
    */



  }

  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.rerender = false;
  }

  ngOnInit() {

    this.router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          console.log('***************** code-pages.component.ts *******************');
          console.log(val.url);
          console.log('************************************');
        }
    });



    // this.param = '';

    this.route.params
    .takeUntil(this.componentDestroyed$)
    .subscribe(params => {


      this.snippetService.currentMessage
      .filter(data => data !== null)
      .takeUntil(this.componentDestroyed$)
      .subscribe(message => {
          this.messageFirstParam = message;

        console.log('******************* this.messageFirstParam: ********************');
        console.log(this.messageFirstParam);
        console.log('****************************************************************');
        console.log('******************* this.param: ********************');
        console.log(this.param);
        console.log('****************************************************************');

        if (!params['id']) {
          console.log('A)');

          if (this.snippetService.lastParam === '') {
            console.log('B)');
            console.log('1) !!!!!!!!!!!!!!!!! this.param: ');
            console.log(this.param);
            this.param = this.messageFirstParam;
          } else {
            console.log('C)');
            console.log('2) !!!!!!!!!!!!!!!!! this.param: ');
            this.param = this.snippetService.lastParam;
            console.log(this.param);
          }
          this.router.navigateByUrl(this.router.url + '/' + this.param);
        } else {
          console.log('D)');
          this.param = params['id'];
          this.snippetService.changeParam(this.param);
        // }

        // this.param = params['id'];
        console.log('3) !!!!!!!!!!!!!!!!! this.param = ', this.param);
        this.snippetId = this.param;
        // Retrive alone snippet by ID from API
        this.snippetService.getByIdSnippet(this.snippetId)
          .takeUntil(this.componentDestroyed$)
          .subscribe(snippet => {
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

            console.log('%%%%%%' + this.router.url + '  router is active? %%%%%%');
            console.log(this.router.isActive(this.router.url, true));
            console.log(this.router.isActive(this.router.url, false));
            console.log(this.router.routerState);
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');

            // Emergency code
            // if a first url /code/ or /code/:id (/code/1.1.0.1) 
            // and a first page loaded then routerLinkActive don't add
            // a class "active-method-link"
            console.log('TTTTTTTTTTTTTTTTTTT Emergency code TTTTTTTTTTTTTTTTTTTT');
            let ar: any;
            ar = document.getElementsByClassName('id-' + this.param)[0];
            console.log(ar);
            if (this.router.isActive(this.router.url, true) && !ar.classList.contains('active-method-link')) {
              // alert('first');
              ar.className += ' active-method-link';
            }
            // ar[0].click();
            // document.getElementsByClassName('method-link')[0].click();
            console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');


          });
      // }


      }
    });


    });



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

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

}
