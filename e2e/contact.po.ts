import { browser, by, element, promise } from 'protractor';

export class ContactPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('contact');
    }

    authorName(): promise.Promise<string> {
        const name = element(by.css('a.name'));
        return name.getText();
    }

    authorDescription(): promise.Promise<string> {
        const description = element(by.css('a.location'));
        return description.getText();
    }

    authorEmail(): promise.Promise<string> {
        const email = element(by.css('a.email'));
        return email.getText();
    }

}
