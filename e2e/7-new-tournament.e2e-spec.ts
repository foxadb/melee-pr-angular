import { NewTournamentPage } from './new-tournament.po';

describe('New Tournament Page:', () => {
    let page: NewTournamentPage;

    beforeEach(() => {
        page = new NewTournamentPage();
    });

    it('navigate to page', () => {
        page.navigateTo();
    });

    it('type tournament name', () => {
        expect(page.typeName('G.R.A.S. #9')).toEqual('G.R.A.S. #9');
    });

    it('type tournament date', () => {
        const date = new Date(2018, 2, 31);
        expect(page.typeDate(date)).toEqual('2018-03-31');
    });

    it('type tournament organiser', () => {
        expect(page.typeOrganiser('Ensimag Gaming')).toEqual('Ensimag Gaming');
    });

    it('type tournament location', () => {
        expect(page.typeLocation('Grenoble')).toEqual('Grenoble');
    });

    it('submit the new tournament', () => {
        expect(page.submitTournament()).toBeTruthy();
    });

});
