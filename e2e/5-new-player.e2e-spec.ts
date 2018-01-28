import { NewPlayerPage } from './new-player.po';

describe('New Player Page:', () => {
    let page: NewPlayerPage;

    beforeEach(() => {
        page = new NewPlayerPage();
    });

    it('type player info', () => {
        page.navigateTo();
        expect(page.typeName('Bobi')).toEqual('Bobi');
        expect(page.typeLocation('Lyon')).toEqual('Lyon');
        expect(page.typeScore(1500)).toEqual(1500);
    });

    it('click on mains', () => {
        page.selectMains(['falco']);
    });

    it('submit the new player', () => {
        expect(page.submitPlayer()).toBeTruthy();
    });

});
