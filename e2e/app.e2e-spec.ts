import { AppPage } from './app.po';

describe('App Root: Ranking Page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('window title test: Melee Power Ranking', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Melee Power Ranking');
  });

  it('type Bobi in the player search bar', () => {
    page.typeSearchedPlayer('Bobi');
    expect(page.getSearchedPlayer()).toEqual('Bobi');
  });

});
