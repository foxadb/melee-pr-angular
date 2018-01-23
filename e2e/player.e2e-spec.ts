import { PlayerPage } from './player.po';

describe('Player details', () => {
    let page: PlayerPage;

    beforeEach(() => {
        page = new PlayerPage();
    });

    it('navigate to ranking', () => {
        page.navigateTo('ranking');
        expect(page.getTitle()).toEqual('Melee Power Ranking');
    });

    it('search Bobi player', () => {
        expect(page.searchPlayer('Bobi')).toBeTruthy();
    });

    it('check player name', () => {
        expect(page.getPlayerName()).toEqual('Bobi');
    });

    it('click opponent', () => {
        expect(page.clickOpponentButton()).toBeTruthy();
    });

});
