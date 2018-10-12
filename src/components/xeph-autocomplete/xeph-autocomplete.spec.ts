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
  });

  describe('onInput', () => {
    it('sets inputValue to Event target value', () => {
      const component = new XephAutoComplete();
      const event = {
        target: { value: 'test' }
      };
      component.onInput(event);
      expect(component.inputValue).toEqual('test');
    });
  });

  describe('onFocus', () => {
    it('sets showInput to true', () => {
      const component = new XephAutoComplete();
      component.showSuggestions = false;
      component.onFocus();
      expect(component.showSuggestions).toBeTruthy();
    });
  });

  describe('onSelect', () => {
    it('sets inputValue to selected suggestion', () => {
      const component = new XephAutoComplete();
      component.onSelect('test');
      expect(component.inputValue).toBe('test');
    })
  });
});
