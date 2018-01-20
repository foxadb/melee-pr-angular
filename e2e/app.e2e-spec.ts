import { AppPage } from './app.po';

describe('App Root', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('window title test: Melee Power Ranking', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Melee Power Ranking');
  });

  it('type Arte in the player search bar', () => {
    page.typeSearchedPlayer('Arte');
    expect(page.getSearchedPlayer()).toEqual('Arte');
  });

});