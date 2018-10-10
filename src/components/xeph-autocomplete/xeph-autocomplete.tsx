import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'xeph-autocomplete',
  shadow: true
})
export class XephAutoComplete {

  @Prop() placeholder: string;

  render() {
    return <input type="text" placeholder={this.placeholder}/>;
  }
}
