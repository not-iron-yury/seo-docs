// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import './style.css';
// import Breadcrumb from './components/Breadcrumb.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    // app.component('Breadcrumb', Breadcrumb);
  },
};
