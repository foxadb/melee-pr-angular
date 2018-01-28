import { ManagerPage } from './manager.po';

describe('Manager Page:', () => {
    let page: ManagerPage;

    beforeEach(() => {
        page = new ManagerPage();
    });

    it('navigate to manager panel', () => {
        page.navigateTo();
        expect(page.getHeader()).toEqual('Hello admin');
    });

    it('click on new player', () => {
        expect(page.clickNewPlayer()).toBeTruthy();
    });

});
