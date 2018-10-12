import { XephAutoComplete } from './xeph-autocomplete';

describe('my-component', () => {
  it('builds', () => {
    expect(new XephAutoComplete()).toBeTruthy();
  });

  describe('findMatch', () => {
    it('returns an array of string matches', () => {
      const component = new XephAutoComplete();
      component.suggestionlist = ['the', 'valid', 'strings', 'for', 'search', 'auto', 'complete', 'foo', 'bar'];
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

  describe('onKeyDown', () => {
    it('sets selectedSuggestion to the next suggestion when down arrow key is pressed', () => {
      const component = new XephAutoComplete();
      component.suggestionArr = ['test', 'test1', 'test2'];
      component.selectedSuggestionIndex = 0;
      const event = {
        key: 'ArrowDown'
      };
      component.onKeyDown(event);
      expect(component.selectedSuggestionIndex).toBe(1);

      // wraps to 0 when exceeds suggestion array length or if selected index is undefined
      component.selectedSuggestionIndex = 2;
      component.onKeyDown(event);
      expect(component.selectedSuggestionIndex).toBe(0);

      component.selectedSuggestionIndex = undefined;
      component.onKeyDown(event);
      expect(component.selectedSuggestionIndex).toBe(0);
    });

    it('sets selectedSuggestion to the previous suggestion when up arrow key is pressed', () => {
      const component = new XephAutoComplete();
      component.suggestionArr = ['test', 'test1', 'test2'];
      component.selectedSuggestionIndex = 1;
      const event = {
        key: 'ArrowUp'
      };
      component.onKeyDown(event);
      expect(component.selectedSuggestionIndex).toBe(0);

      // wraps to last index when selected index is 0 or undefined
      component.selectedSuggestionIndex = 0;
      component.onKeyDown(event);
      expect(component.selectedSuggestionIndex).toBe(2);

      component.selectedSuggestionIndex = undefined;
      component.onKeyDown(event);
      expect(component.selectedSuggestionIndex).toBe(2);
    });
  });

  describe('onKeyPress', () => {
    it('sets inputValue to current selected suggestion when Enter is pressed', () => {
      const component = new XephAutoComplete();
      component.suggestionArr = ['test', 'test1', 'test2'];
      component.selectedSuggestionIndex = 1;
      const event = {
        preventDefault: () => {},
        key: 'Enter'
      };
      component.onKeyPress(event);
      expect(component.inputValue).toBe('test1');
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
