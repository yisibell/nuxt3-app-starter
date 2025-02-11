import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options

  presets: [],
  rules: [
    // m(a|t|b|l|r|x|y)-*
    [/^ma-(\d+)$/, ([, d]) => ({ margin: `${d}px !important` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}px !important` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}px !important` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}px !important` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}px !important` })],
    [/^mx-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}px !important`, 'margin-right': `${d}px !important` })],
    [/^my-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}px !important`, 'margin-bottom': `${d}px !important` })],

    // p(a|t|b|l|r|x|y)-*
    [/^pa-(\d+)$/, ([, d]) => ({ padding: `${d}px !important` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}px !important` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}px !important` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}px !important` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}px !important` })],
    [/^px-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}px !important`, 'padding-right': `${d}px !important` })],
    [/^py-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}px !important`, 'padding-bottom': `${d}px !important` })],

    // fs-*
    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px !important` })],

    // fw-*
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': `${d} !important` })],

    // width-*
    [/^width-(\d+)$/, ([, d]) => ({ width: `${d}px !important` })],
    [/^percent-width-(\d+)$/, ([, d]) => ({ width: `${d}% !important` })],

  ],
})
