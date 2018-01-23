import { browser, by, element, promise, protractor } from 'protractor';

export class LoginPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('login');
    }

    typeUsername(username: string): promise.Promise<string> {
        const inputField = element(by.css('form input[type=text]'));

        inputField.clear();
        inputField.sendKeys(username);

        return inputField.getAttribute('value');
    }

    typePassword(password: string): promise.Promise<string> {
        const inputField = element(by.css('form input[type=password]'));

        inputField.clear();
        inputField.sendKeys(password);

        return inputField.getAttribute('value');
    }

    login(): promise.Promise<promise.Promise<boolean>> {
        const loginButton = element(by.css('form button'));
        loginButton.click();

        return browser.driver.wait(function () {
            return browser.driver.getCurrentUrl().then(function (url) {
                return /admin/.test(url);
            });
        }, 1000).catch(function () {
            return false;
        });
    }
}
