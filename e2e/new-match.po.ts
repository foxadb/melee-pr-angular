import { browser, by, element, promise, protractor } from 'protractor';

export class NewMatchPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('manager');
    }

    searchTournament(name: string): promise.Promise<boolean> {
        const searchTournament = element.all(by.css('form input[type=text]')).get(1);
        searchTournament.sendKeys(name);
        searchTournament.sendKeys(protractor.Key.ENTER);

        const searchButton = element.all(by.css('form button[type=submit]')).get(1);
        searchButton.click();

        return browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /tournament/.test(url);
            });
        }, 1000).catch(function () {
            return false;
        });
    }

    typePlayerName(index: number, name: string): promise.Promise<string> {
        const playerInput = element.all(by.css('div.match-creator input[type=text]')).get(index);
        playerInput.sendKeys(name);
        playerInput.sendKeys(protractor.Key.ENTER);

        return playerInput.getAttribute('value');
    }

    typePlayerScore(index: number, score: number): promise.Promise<number> {
        const playerInput = element.all(by.css('div.match-creator input[type=number]')).get(index);
        playerInput.sendKeys(score);
        playerInput.sendKeys(protractor.Key.ENTER);

        return playerInput.getAttribute('value').then(value => Number(value));
    }

    submitMatch(): promise.Promise<boolean> {
        const submitButton = element(by.id('addMatchButton'));
        submitButton.click();

        return browser.driver.wait(protractor.until.elementLocated(by.css('div.alert-success')), 500)
            .then(elem => true)
            .catch(err => {
                console.error('Alert success not found');
                return false;
            });
    }

}
