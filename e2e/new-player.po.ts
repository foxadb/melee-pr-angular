import { browser, by, element, promise, protractor } from 'protractor';

export class NewPlayerPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('manager/player');
    }

    typeName(name: string): promise.Promise<string> {
        const inputField = element(by.css('form input[id=name]'));

        inputField.clear();
        inputField.sendKeys(name);

        return inputField.getAttribute('value');
    }

    typeLocation(location: string): promise.Promise<string> {
        const inputField = element(by.css('form input[id=location]'));

        inputField.clear();
        inputField.sendKeys(location);

        return inputField.getAttribute('value');
    }

    typeScore(score: number): promise.Promise<number> {
        const inputField = element(by.css('form input[id=score]'));

        inputField.clear();
        inputField.sendKeys(score);

        return inputField.getAttribute('value').then(value => Number(value));
    }

    selectMains(mains: string[]): void {
        mains.forEach(main => {
            const mainButton = element(by.id(main));
            mainButton.click();
        });
    }

    submitPlayer() {
        const submitButton = element(by.css('form button[type=submit]'));
        submitButton.click();

        return browser.driver.wait(protractor.until.elementLocated(by.css('div.alert-success')), 500)
            .then(elem => true)
            .catch(err => {
                console.error('Alert success not found');
                return false;
            });
    }

}
