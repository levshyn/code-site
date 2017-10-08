import { Component, OnInit, OnDestroy, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { SnippetService } from '../services/snippet.service';
import { SnippetModelService } from '../services/snippet-model.service';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-code-pages',
  templateUrl: './code-pages.component.html',
  styleUrls: ['./code-pages.component.scss']
})
export class CodePagesComponent implements OnInit, OnDestroy {
  codeSnippet: string = '';
  snippetModel: SnippetModelService;
  snippetId: string;
  private param: string = '';
  // id: number;
  // private sub: any;
  rerender: boolean;
  componentDestroyed$: Subject<boolean> = new Subject();
  messageFirstParam: string;
  previousUrl: string = '';
  currentUrl: string;
  private _elementRef: ElementRef;

  constructor(private snippetService: SnippetService, private route: ActivatedRoute,
      private router: Router, private cdRef: ChangeDetectorRef, private renderer: Renderer2) {
  }

  doRerender() {
    this.rerender = true;
    this.cdRef.detectChanges();
    this.rerender = false;
  }

  ngOnInit() {

    // get element from sidenav-nav.component.ts
    this.snippetService.currentSideNavEl$
      .takeUntil(this.componentDestroyed$)
      .subscribe((element: ElementRef) => {
        this._elementRef = element;
      });

    this.route.params
    .takeUntil(this.componentDestroyed$)
    .subscribe(params => {
      this.snippetService.currentMessage
      .filter(data => data !== null)
      .takeUntil(this.componentDestroyed$)
      .subscribe(message => {
        this.messageFirstParam = message;

        if (!params['id']) {
          if (this.snippetService.lastParam === '') {
            this.param = this.messageFirstParam;
          } else {
            this.param = this.snippetService.lastParam;
          }
          this.currentUrl = this.router.url + '/' + this.param;
  
          this.router.navigateByUrl(this.currentUrl/*, { replaceUrl: true }*/);
          // this.snippetService.changeUrl(this.currentUrl);
          // this.router.navigate([this.router.url + '/' + this.param], { replaceUrl: true });
        } else {
          this.param = params['id'];
          this.snippetService.changeParam(this.param);
        // }

        // this.param = params['id'];
        this.snippetId = this.param;
        // Retrive alone snippet by ID from API
        this.snippetService.getByIdSnippet(this.snippetId)
          .takeUntil(this.componentDestroyed$)
          .subscribe(snippet => {
            this.codeSnippet = snippet.codeSnippet;
            this.snippetModel = new SnippetModelService().deserialize(snippet);
            this.doRerender();

            // Emergency code
            // if a first url /code/ or /code/:id (/code/1.1.0.1)
            // and a first page loaded then routerLinkActive don't add
            // a class "active-method-link"
            let element: any;
            element = this._elementRef.nativeElement.getElementsByClassName('id-' + this.param)[0];
            if (this.router.isActive(this.router.url, true) && !this._elementRef.nativeElement.classList.contains('active-method-link')) {
              this.renderer.addClass(element,'active-method-link');
            }
          });
      // }

        }
      });
    });

  }

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

}
