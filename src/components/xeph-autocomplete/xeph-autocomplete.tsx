import { Component, Prop, State, Listen, Element } from '@stencil/core';

@Component({
  tag: 'xeph-autocomplete',
  shadow: true
})
export class XephAutoComplete {

  @Element() element: HTMLElement;

  @State() showSuggestions = false;
  @State() inputValue = '';

  @Prop() placeholder: string;
  @Prop() validarr: string[] = [];

  @Listen('window:click') 
  handleWindowClick(e: Event) {
    if ((e.target as HTMLElement) !== this.element) {
      this.showSuggestions = false;
    }
  }

  findMatch = (searchTerm: string): string[] => {
    if (searchTerm.length === 0) {
      return [];
    }
    return this.validarr.filter((term) => term.slice(0, searchTerm.length) === searchTerm);
  };

  onInput = (e) => {
    this.inputValue = (e.target as any).value;
  };

  onFocus = () => {
    this.showSuggestions = true;
  }

  onSelect = (selection: string) => {
    this.inputValue = selection;
  }

  getSuggestionElement = (suggestion): JSX.Element => (
    <li
      onClick={() => this.onSelect(suggestion)}
    >
      {suggestion}
    </li>
  );

  render() {
    return (
      <span>
        <input
          type="text"
          placeholder={this.placeholder}
          value={this.inputValue}
          onInput={e => this.onInput(e)}
          onFocus={() => this.onFocus()}
        />
        <ul hidden={!this.showSuggestions}>
          {this.findMatch(this.inputValue).map(suggestion => this.getSuggestionElement(suggestion))}
        </ul>
      </span>
    );
  }
}
