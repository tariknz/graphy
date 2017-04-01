import { GraphyPage } from './app.po';

describe('graphy App', () => {
  let page: GraphyPage;

  beforeEach(() => {
    page = new GraphyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
