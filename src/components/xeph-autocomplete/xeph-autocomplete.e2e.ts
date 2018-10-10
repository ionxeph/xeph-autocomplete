import { newE2EPage } from '@stencil/core/testing';

describe('xeph-autocomplete', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<xeph-autocomplete></xeph-autocomplete>');
    const element = await page.find('xeph-autocomplete');
    expect(element).toHaveClass('hydrated');
  });
});
