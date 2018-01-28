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

    it('click on manager panel', () => {
        expect(page.clickManagerPanel()).toBeTruthy();
    });

});
