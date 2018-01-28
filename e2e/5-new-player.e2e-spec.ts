import { NewPlayerPage } from './new-player.po';

describe('New Player Page:', () => {
    let page: NewPlayerPage;

    beforeEach(() => {
        page = new NewPlayerPage();
    });

    it('navigate to', () => {
        page.navigateTo();
    });

    it('type player name', () => {
        expect(page.typeName('Bobi')).toEqual('Bobi');
    });

    it('type player location', () => {
        expect(page.typeLocation('Lyon')).toEqual('Lyon');
    });

    it('type player score', () => {
        expect(page.typeScore(1500)).toEqual(1500);
    });

    it('click on mains', () => {
        page.selectMains(['falco']);
    });

    it('submit the new player', () => {
        expect(page.submitPlayer()).toBeTruthy();
    });

});
