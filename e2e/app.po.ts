import { browser, by, element, promise, protractor } from 'protractor';

export class AppPage {

  navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  getTitle(): promise.Promise<string> {
    return browser.getTitle();
  }

  typeSearchedPlayer(name: string): void {
    const searchPlayer = element(by.css('form input[type=text]'));
    searchPlayer.sendKeys(name);
    searchPlayer.sendKeys(protractor.Key.ENTER);
  }

  getSearchedPlayer(): promise.Promise<string> {
    const searchPlayer = element(by.css('form input[type=text]'));
    return searchPlayer.getAttribute('value');
  }

}
