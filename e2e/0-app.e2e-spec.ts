import { AppPage } from './app.po';

describe('App Root:', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('navigate to', () => {
    page.navigateTo();
  });

  it('window title test: Melee Power Ranking', () => {
    expect(page.getTitle()).toEqual('Melee Power Ranking');
  });

  it('type Bobi in the player search bar', () => {
    page.typeSearchedPlayer('Bobi');
    expect(page.getSearchedPlayer()).toEqual('Bobi');
  });

});
