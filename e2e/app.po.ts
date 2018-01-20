import { browser, by, element, protractor } from 'protractor';

export class AppPage {
  sleep(time: number) {
    browser.sleep(time);
  }
  
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  typeSearchedPlayer(name: string) {
    var searchPlayer = element(by.css('form input[type=text]'));
    searchPlayer.sendKeys(name);
    searchPlayer.sendKeys(protractor.Key.ENTER);
  }

  getSearchedPlayer() {
    var searchPlayer = element(by.css('form input[type=text]'));
    return searchPlayer.getAttribute('value');
  }

}