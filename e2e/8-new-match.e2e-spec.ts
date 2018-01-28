import { NewMatchPage } from './new-match.po';

describe('New Match Page:', () => {
    let page: NewMatchPage;

    beforeEach(() => {
        page = new NewMatchPage();
    });

    it('navigate to', () => {
        page.navigateTo();
    });

    it('seach tournament', () => {
        expect(page.searchTournament('G.R.A.S. #9')).toBeTruthy();
    });

    it('type player 1 name', () => {
        expect(page.typePlayerName(0, 'Bobi')).toEqual('Bobi');
    });

    it('type player 1 score', () => {
        expect(page.typePlayerScore(0, 3)).toEqual(3);

    });

    it('type player 2 name', () => {
        expect(page.typePlayerName(1, 'LuK')).toEqual('LuK');
    });

    it('type player 2 score', () => {
        expect(page.typePlayerScore(1, 1)).toEqual(1);
    });

    it('submit the new match', () => {
        expect(page.submitMatch()).toBeTruthy();
    });

});
