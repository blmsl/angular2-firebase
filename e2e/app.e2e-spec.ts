import { PoehalyAngular2FirebasePage } from './app.po';

describe('poehaly-angular2-firebase App', () => {
  let page: PoehalyAngular2FirebasePage;

  beforeEach(() => {
    page = new PoehalyAngular2FirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
