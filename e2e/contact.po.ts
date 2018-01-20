import { browser, by, element } from 'protractor';

export class ContactPage {
    sleep(time: number) {
        browser.sleep(time);
    }

    navigateTo() {
        return browser.get('/contact');
    }

    authorName(index: number) {
        var name = element.all(by.css('a.name')).get(index);
        return name.getText();
    }

    authorDescription(index: number) {
        var description = element.all(by.css('a.location')).get(index);
        return description.getText();
    }

    authorEmail(index: number) {
        var email = element.all(by.css('a.email')).get(index);
        return email.getText();
    }

}