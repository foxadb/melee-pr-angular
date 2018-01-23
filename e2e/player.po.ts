import { browser, by, element, protractor, promise } from 'protractor';

export class PlayerPage {

    navigateTo(url: string): promise.Promise<any> {
        return browser.get(url);
    }

    getTitle(): promise.Promise<string> {
        const title = element(by.css('div.title'));
        return title.getText();
    }

    searchPlayer(name: string): promise.Promise<boolean> {
        const searchPlayer = element(by.css('form input[type=text]'));
        searchPlayer.sendKeys(name);
        searchPlayer.sendKeys(protractor.Key.ENTER);

        const searchButton = element(by.css('button'));
        searchButton.click();

        return browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /player/.test(url);
            });
        }, 1000).catch(function () {
            return false;
        });
    }

    getPlayerName(): promise.Promise<string> {
        const name = element(by.css('h1'));
        return name.getText();
    }

    clickOpponentButton(): promise.Promise<boolean> {
        return browser.driver.getCurrentUrl().then(function (oldUrl) {
            const playerButton = element.all(by.css('button')).first();
            playerButton.click();

            return browser.driver.wait(function () {
                return browser.driver.getCurrentUrl().then(function (url) {
                    return /player/.test(url) && url !== oldUrl;
                });
            }, 1000).catch(function () {
                return false;
            });
        });
    }

}
