import { LoginPage } from './login.po';

describe('Login Page:', () => {
    let page: LoginPage;

    beforeEach(() => {
        page = new LoginPage();
    });

    it('navigate to', () => {
        page.navigateTo();
    });

    it('login fail', () => {
        expect(page.typeUsername('wrongadmin')).toEqual('wrongadmin');
        expect(page.typePassword('wrongpassword')).toEqual('wrongpassword');
        expect(page.login()).toBeFalsy();
    });

    it('login success', () => {
        expect(page.typeUsername('admin')).toEqual('admin');
        expect(page.typePassword('password')).toEqual('password');
        expect(page.login()).toBeTruthy();
    });

});
