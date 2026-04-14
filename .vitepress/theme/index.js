// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme';
import { h } from 'vue';
import './style.css';

import Accordions from './components/Accordions.vue';
import Breadcrumb from './components/Breadcrumb.vue';
import Checklist from './components/Checklist.vue';
import Marker from './components/Marker.vue';

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component('Checklist', Checklist);
    app.component('Breadcrumb', Breadcrumb);
    app.component('Marker', Marker);
    app.component('Accordions', Accordions);
  },
};
