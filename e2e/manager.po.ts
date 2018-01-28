import { browser, by, element, promise, protractor } from 'protractor';

export class ManagerPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('manager');
    }

    getHeader(): promise.Promise<string> {
        const header = element(by.css('h1'));
        return header.getText();
    }

    clickNewPlayer(): promise.Promise<promise.Promise<boolean>> {
        const newPlayerButton = element.all(by.css('button')).get(5);
        newPlayerButton.click();

        return browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /player/.test(url);
            });
        }, 1000).catch(function () {
            return false;
        });
    }
}
