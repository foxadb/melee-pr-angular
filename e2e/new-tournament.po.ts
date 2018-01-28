import { browser, by, element, promise, protractor } from 'protractor';

export class NewTournamentPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('manager/tournament');
    }

    typeName(name: string): promise.Promise<string> {
        const inputField = element(by.css('form input[id=name]'));
        inputField.sendKeys(name);
        return inputField.getAttribute('value');
    }

    typeDate(date: Date): promise.Promise<string> {
        const inputField = element(by.css('form input[id=date]'));

        const dateString = date.toLocaleDateString();
        inputField.sendKeys(dateString);

        return inputField.getAttribute('value');
    }

    typeOrganiser(organiser: string): promise.Promise<string> {
        const inputField = element(by.css('form input[id=organiser]'));
        inputField.sendKeys(organiser);
        return inputField.getAttribute('value');
    }

    typeLocation(location: string): promise.Promise<string> {
        const inputField = element(by.css('form input[id=location]'));
        inputField.sendKeys(location);
        return inputField.getAttribute('value');
    }

    submitTournament(): promise.Promise<boolean> {
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
