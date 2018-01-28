import { browser, by, element, promise, protractor } from 'protractor';

export class AdminPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('admin');
    }

    getHeader(): promise.Promise<string> {
        const header = element(by.css('h1'));
        return header.getText();
    }

    clickManagerPanel(): promise.Promise<promise.Promise<boolean>> {
        const managerButton = element.all(by.css('button')).get(1);
        managerButton.click();

        return browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /manager/.test(url);
            });
        }, 1000).catch(function () {
            return false;
        });
    }
}
