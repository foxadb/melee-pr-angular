import { browser, by, element, promise } from 'protractor';

export class ContactPage {

    navigateTo(): promise.Promise<any> {
        return browser.get('contact');
    }

    authorName(index: number): promise.Promise<string> {
        const name = element.all(by.css('a.name')).get(index);
        return name.getText();
    }

    authorDescription(index: number): promise.Promise<string> {
        const description = element.all(by.css('a.location')).get(index);
        return description.getText();
    }

    authorEmail(index: number): promise.Promise<string> {
        const email = element.all(by.css('a.email')).get(index);
        return email.getText();
    }

}
