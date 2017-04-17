import { PoehalyAngularFirebasePage } from './app.po';

describe('poehaly-angular-firebase App', () => {
  let page: PoehalyAngularFirebasePage;

  beforeEach(() => {
    page = new PoehalyAngularFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
