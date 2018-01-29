import { browser, by, element, promise, protractor } from 'protractor';

export class AdminPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('admin');
    }

    getHeader(): promise.Promise<string> {
        const header = element(by.css('h1'));
        return header.getText();
    }

    typeNewUsername(name: string): promise.Promise<string> {
        const inputField = element(by.id('username'));
        inputField.sendKeys(name);
        return inputField.getAttribute('value');
    }

    typeNewPassword(password: string): promise.Promise<string> {
        const inputField = element(by.id('password'));
        inputField.sendKeys(password);
        return inputField.getAttribute('value');
    }

    selectNewRole(role: string): promise.Promise<string> {
        const inputField = element(by.id(role));
        inputField.click();
        return inputField.getAttribute('ng-reflect-model');
    }

    submitNewUser(): promise.Promise<boolean> {
        const submitButton = element(by.id('submitUser'));
        submitButton.click();

        return browser.driver.wait(protractor.until.elementLocated(by.css('div.alert-success')), 500)
            .then(elem => true)
            .catch(err => {
                console.error('Alert success not found');
                return false;
            });
    }

    deleteUser(index: number): promise.Promise<boolean> {
        const submitButton = element.all(by.css('button.btn-danger')).get(index);
        submitButton.click();

        return browser.driver.wait(protractor.until.elementLocated(by.css('div.modal-footer')), 500)
            .then(() => {
                // Click on the confirmation button
                const confirmButton = element(by.id('yesButton'));
                confirmButton.click();

                return browser.driver.wait(protractor.until.elementLocated(by.css('div.alert-success')), 500)
                    .then(elem => true)
                    .catch(err => {
                        console.error('Alert success not found');
                        return false;
                    });
            });
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
