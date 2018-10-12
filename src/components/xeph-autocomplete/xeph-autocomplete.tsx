import { Component, Prop, State, Listen, Element, Watch } from '@stencil/core';

@Component({
  tag: 'xeph-autocomplete'
})
export class XephAutoComplete {

  @Element() element: HTMLElement;

  @State() showSuggestions = false;
  @State() inputValue = '';
  @State() suggestionArr: string[] = [];
  @State() selectedSuggestionIndex: number;

  @Prop() placeholder: string = '';
  @Prop() suggestionlist: string[] = [];

  @Watch('suggestionlist')
  validateSuggestionlist(newValue: string[]) {
    const sortedArr = newValue.slice().sort();
    let results = [];
    for (let i = 0; i < sortedArr.length - 1; i++) {
      if (sortedArr[i + 1] == sortedArr[i]) {
      results.push(sortedArr[i]);
      }
    }
    if (results.length > 0) {
      throw new Error(`suggestion list contains duplicate values: ${results.toLocaleString()}`);
    }
  }

  @Listen('window:click') 
  handleWindowClick(e: Event) {
    if ((e.target as HTMLElement) !== this.element) {
      this.showSuggestions = false;
      this.selectedSuggestionIndex = undefined;
    }
  }

  componentWillLoad() {
    this.validateSuggestionlist(this.suggestionlist);
  }

  findMatch = (searchTerm: string): string[] => {
    if (searchTerm.length === 0) {
      return [];
    }
    return this.suggestionlist.filter(
      (term) => term.slice(0, searchTerm.length) === searchTerm && term !== searchTerm
    );
  };

  onInput = (e) => {
    this.inputValue = (e.target as any).value;
    this.suggestionArr = this.findMatch(this.inputValue);
    this.showSuggestions = true;
  };

  onFocus = () => {
    this.showSuggestions = true;
    this.selectedSuggestionIndex = undefined;
    this.suggestionArr = this.findMatch(this.inputValue);
  }

  onKeyDown = (e) => {
    switch(e.key) {
      case 'ArrowUp':
        if (this.suggestionArr.length > 0) {
          this.selectedSuggestionIndex = 
            (this.selectedSuggestionIndex === undefined || this.selectedSuggestionIndex === 0) ?
              this.suggestionArr.length - 1 : this.selectedSuggestionIndex - 1;
        }
        break;
      case 'ArrowDown':
        if (this.suggestionArr.length > 0) {
          this.selectedSuggestionIndex = 
            (this.selectedSuggestionIndex === undefined || this.selectedSuggestionIndex === this.suggestionArr.length - 1) ?
              0 : this.selectedSuggestionIndex + 1;
        }
        break;
      default: 
        break;
    }
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (this.selectedSuggestionIndex !== undefined) {
        this.inputValue = this.suggestionArr[this.selectedSuggestionIndex];
        this.selectedSuggestionIndex = undefined;
        this.showSuggestions = false;
      }
    }
  }

  onSelect = (selection: string) => {
    this.inputValue = selection;
    this.selectedSuggestionIndex = undefined;
    this.showSuggestions = false;
  }

  getSuggestionElement = (suggestion): JSX.Element => {
    const isSelected = this.selectedSuggestionIndex !== undefined
      && suggestion === this.suggestionArr[this.selectedSuggestionIndex];
    return (<li
      class={'xeph-suggestion ' + (isSelected ? 'xeph-selected': '')}
      onClick={() => this.onSelect(suggestion)}
    >
      {suggestion}
    </li>);
  };

  render() {
    return ([
      <input
        type="text"
        placeholder={this.placeholder}
        value={this.inputValue}
        onInput={e => this.onInput(e)}
        onFocus={() => this.onFocus()}
        onKeyDown={e => this.onKeyDown(e)}
        onKeyPress={e => this.onKeyPress(e)}
      />,
      <ul hidden={!this.showSuggestions}>
        {this.suggestionArr.map(suggestion => this.getSuggestionElement(suggestion))}
      </ul>
    ]);
  }
}
