import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePagesComponent } from './code-pages.component';

describe('CodePagesComponent', () => {
  let component: CodePagesComponent;
  let fixture: ComponentFixture<CodePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
