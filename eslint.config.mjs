import { createConfigForNuxt } from '@nuxt/eslint-config/flat'
import regexpPlugin from 'eslint-plugin-regexp'
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility'

export default createConfigForNuxt({
  features: {
    tooling: true,
    stylistic: true,
    formatters: true,
  },
},
{
  plugins: {
    'regexp': regexpPlugin,
    'vuejs-accessibility': pluginVueA11y,
  },
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    'vue/no-v-html': 'off',
    'vue/no-v-text-v-html-on-component': 'warn',
    'regexp/no-unused-capturing-group': 'warn',
    '@stylistic/multiline-ternary': 'off',
    'no-useless-assignment': 'warn',
    'vuejs-accessibility/alt-text': ['error', {
      img: ['BaseImage', 'base-image'],
    }],
  },

})
