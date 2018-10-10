import { newE2EPage } from '@stencil/core/testing';

describe('xeph-autocomplete', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<xeph-autocomplete></xeph-autocomplete>');
    const element = await page.find('xeph-autocomplete');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the placeholder', async () => {
    const page = await newE2EPage();

    await page.setContent('<xeph-autocomplete></xeph-autocomplete>');
    const component = await page.find('xeph-autocomplete');
    const element = await page.find('xeph-autocomplete >>> input');
    expect(element.getAttribute('placeholder')).toBeNull();

    component.setProperty('placeholder', 'test placeholder');
    await page.waitForChanges();
    expect(element.getAttribute('placeholder')).toEqual(`test placeholder`);
  });
});
