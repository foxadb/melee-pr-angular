import { AdminPage } from './admin.po';

describe('Admin Page:', () => {
    let page: AdminPage;

    beforeEach(() => {
        page = new AdminPage();
    });

    it('navigate to', () => {
        page.navigateTo();
    });

    it('navigate to admin panel', () => {
        expect(page.getHeader()).toEqual('Hello admin');
    });

    it('type new username', () => {
        expect(page.typeNewUsername('newmanager')).toEqual('newmanager');
    });

    it('type new password', () => {
        expect(page.typeNewPassword('newpassword')).toEqual('newpassword');
    });

    it('select new role', () => {
        expect(page.selectNewRole('admin')).toEqual('admin');
        expect(page.selectNewRole('manager')).toEqual('manager');
    });

    it('submit new user', () => {
        expect(page.submitNewUser()).toBeTruthy();
    });

    it('delete newly created user', () => {
        expect(page.deleteUser(1)).toBeTruthy();
    });

    it('click on manager panel', () => {
        expect(page.clickManagerPanel()).toBeTruthy();
    });

});
