import { TestmutsPage } from './app.po';

describe('testmuts App', function() {
  let page: TestmutsPage;

  beforeEach(() => {
    page = new TestmutsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
