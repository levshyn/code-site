import { Component, OnInit, OnDestroy } from '@angular/core';
import { SnippetService } from '../services/snippet.service';
import { SnippetModelService } from '../services/snippet-model.service';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  snippetModel: SnippetModelService;

  constructor(private snippetService: SnippetService) {
  }

  ngOnInit() {
    let snippetId: string = '0.0.0.0';
    // Retrive alone snippet by ID from API
    this.snippetService.getByIdSnippet(snippetId)
      .takeUntil(this.componentDestroyed$)
      .subscribe(data => {
        this.snippetModel = new SnippetModelService().deserialize(data);
      });

  }

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

}
