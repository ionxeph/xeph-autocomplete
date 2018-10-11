import { Component, Prop, State } from '@stencil/core';

@Component({
  tag: 'xeph-autocomplete',
  shadow: true
})
export class XephAutoComplete {

  @State() inputValue = '';

  @Prop() placeholder: string;
  @Prop() validarr: string[] = [];

  findMatch(searchTerm: string): string[] {
    if (searchTerm.length === 0) {
      return [];
    }
    return this.validarr.filter((term) => term.slice(0, searchTerm.length) === searchTerm);
  }

  onInput(e: Event) {
    this.inputValue = (e.target as any).value;
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder={this.placeholder}
          value={this.inputValue}
          onInput={ e => this.onInput(e) }
        />
        <ul>
          { this.findMatch(this.inputValue).map(result => <li>{result}</li>) }
        </ul>
      </div>
    );
  }
}
