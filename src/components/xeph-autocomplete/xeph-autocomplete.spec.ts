import { XephAutoComplete } from './xeph-autocomplete';

describe('my-component', () => {
  it('builds', () => {
    expect(new XephAutoComplete()).toBeTruthy();
  });

  describe('findMatch', () => {
    it('returns an array of string matches', () => {
      const component = new XephAutoComplete();
      component.validarr = ['the', 'valid', 'strings', 'for', 'search', 'auto', 'complete', 'foo', 'bar'];
      const expectedResult = ['for', 'foo'];
      expect(component.findMatch('fo')).toEqual(expectedResult);
    });
  })
});
