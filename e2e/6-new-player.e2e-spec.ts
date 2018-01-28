import { NewPlayerPage } from './new-player.po';

describe('New Player Page:', () => {
    let page: NewPlayerPage;

    beforeEach(() => {
        page = new NewPlayerPage();
    });

    it('type player info', () => {
        page.navigateTo();
        expect(page.typeName('LuK')).toEqual('LuK');
        expect(page.typeLocation('Grenoble')).toEqual('Grenoble');
        expect(page.typeScore(1250)).toEqual(1250);
    });

    it('click on mains', () => {
        page.selectMains(['falcon']);
    });

    it('submit the new player', () => {
        expect(page.submitPlayer()).toBeTruthy();
    });

});
