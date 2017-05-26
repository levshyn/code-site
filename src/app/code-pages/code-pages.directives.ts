import { AfterViewInit } from '@angular/core/core';
import { Directive, ElementRef } from '@angular/core';

declare var hljs: any;

@Directive({
  selector: 'code[codeHighlight]'
})
export class HighlightCodeDirective implements AfterViewInit {
  constructor(private eltRef: ElementRef) {
  }

  ngAfterViewInit() {
    hljs.highlightBlock(this.eltRef.nativeElement);
  }
}
