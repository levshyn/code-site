import { MysiteAngularMatdesignPage } from './app.po';

describe('mysite-angular-matdesign App', () => {
  let page: MysiteAngularMatdesignPage;

  beforeEach(() => {
    page = new MysiteAngularMatdesignPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
