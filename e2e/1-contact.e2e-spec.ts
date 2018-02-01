import { ContactPage } from './contact.po';

describe('Contact Page:', () => {
  let page: ContactPage;

  beforeEach(() => {
    page = new ContactPage();
  });

  it('navigate to', () => {
    page.navigateTo();
  });

  it('check author name', () => {
    expect(page.authorName()).toEqual('Samy Amraoui');
  });

  it('check author description', () => {
    expect(page.authorDescription()).toEqual('Grenoble, Auvergne-Rhône-Alpes, FR');
  });

  it('check author email', () => {
    expect(page.authorEmail()).toEqual('sametzy[at]gmail[dot]com');
  });

});
