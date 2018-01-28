import { ContactPage } from './contact.po';

describe('Contact Page:', () => {
  let page: ContactPage;

  beforeEach(() => {
    page = new ContactPage();
  });

  it('navigate to', () => {
    page.navigateTo();
  });

  it('check author names', () => {
    expect(page.authorName(0)).toEqual('Samy Amraoui');
    expect(page.authorName(1)).toEqual('Julien Bernard');
    expect(page.authorName(2)).toEqual('Julien Camus');
  });

  it('check author descriptions', () => {
    expect(page.authorDescription(0)).toEqual('Metz, Grand Est, FR');
    expect(page.authorDescription(1)).toEqual('Paris, Île-de-France, FR');
    expect(page.authorDescription(2)).toEqual('Dax, Nouvelle-Aquitaine, FR');
  });

  it('check author emails', () => {
    expect(page.authorEmail(0)).toEqual('samy.amraoui@grenoble-inp.org');
    expect(page.authorEmail(1)).toEqual('julien.bernard@grenoble-inp.org');
    expect(page.authorEmail(2)).toEqual('julien.camus@grenoble-inp.org');
  });

});
