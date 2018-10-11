import { newE2EPage } from '@stencil/core/testing';

describe('xeph-autocomplete', () => {
  it('renders', async() => {
    const page = await newE2EPage();

    await page.setContent('<xeph-autocomplete></xeph-autocomplete>');
    const element = await page.find('xeph-autocomplete');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the placeholder', async() => {
    const page = await newE2EPage();

    await page.setContent('<xeph-autocomplete></xeph-autocomplete>');
    const component = await page.find('xeph-autocomplete');
    const element = await page.find('xeph-autocomplete >>> input');
    expect(element.getAttribute('placeholder')).toBeNull();

    component.setProperty('placeholder', 'test placeholder');
    await page.waitForChanges();
    expect(element.getAttribute('placeholder')).toEqual(`test placeholder`);
  });

  xit('renders a list of string matches', async() => {
    const page = await newE2EPage();

    await page.setContent('<xeph-autocomplete></xeph-autocomplete>');
    const component = await page.find('xeph-autocomplete');
    const inputElement = await page.find('xeph-autocomplete >>> input');
    component.setProperty('validArr', ['the', 'valid', 'strings', 'for', 'search', 'auto', 'complete', 'foo', 'bar']);
    inputElement.setAttribute('value', 'fo');

    await page.waitForChanges();
    console.log(inputElement.getAttribute('value'));
    const listElements = await page.findAll('xeph-autocomplete >>> li');
    expect(listElements.length).toBe(2);
  });
});
