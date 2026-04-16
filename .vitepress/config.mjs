import { defineConfig } from 'vitepress';

export default defineConfig({
  base: '/seo-docs/',
  srcDir: 'www',
  title: 'SEO docs',
  description: 'Документация по SEO, чек-листы, гайды',
  appearance: 'dark',
  themeConfig: {
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Технические гайды', link: '/guides/' },
      {
        text: 'Технические гайды',
        link: '/guides/components/introduction.html',
        activeMatch: '^/guides/',
      },
      // { text: 'Чеклисты', link: '/checklists/' },
      {
        text: 'Чеклисты',
        link: '/checklists/technical/robots.html',
        activeMatch: '^/checklists/',
      },
      // { text: 'Конспекты', link: '/docs/' },
      {
        text: 'Конспекты',
        link: '/docs/technical-seo/canonical.html',
        activeMatch: '^/docs/',
      },
    ],

    head: [
      ['meta', { name: 'robots', content: 'noindex, nofollow, noarchive' }],
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      ['link', { rel: 'alternate icon', href: '/favicon.ico' }],
    ],

    // sidebar: [
    //   {
    //     text: 'Чеклисты',
    //     items: [
    //       { text: 'Технические факторы', link: '/technical-factors/index' },
    //       { text: 'Факторы контента', link: '/guides/x-robots-tag' },
    //     ],
    //   },
    // ],

    // sidebar: {
    //   // для всех страниц по пути /checklists/
    //   '/checklists/': [
    //     { text: 'Чеклист по индексации', link: '/checklists/index' },
    //     { text: 'Чеклист по canonical', link: '/checklists/canonical' },
    //     { text: 'Чеклист по микроразметке', link: '/checklists/microdata' },
    //   ],

    //   // для всех страниц по пути /guides/
    //   '/guides/': [
    //     { text: 'Гайд по техническому SEO', link: '/guides/technical-seo' },
    //     { text: 'Гайд по контенту', link: '/guides/content' },
    //   ],
    // },

    sidebar: {
      checklists: [
        {
          text: 'Screaming Frog',
          collapsible: true,
          collapsed: false,
          items: [
            { text: 'Индексация', link: '/checklists/screaming-frog/indexing' },
            { text: 'Коды ответов', link: '/checklists/screaming-frog/response-codes' },
            { text: 'Canonical', link: '/checklists/screaming-frog/canonical' },
            { text: 'Дубли', link: '/checklists/screaming-frog/duplicates' },
            { text: 'Мета-теги', link: '/checklists/screaming-frog/meta-tags' },
            { text: 'H1-H2', link: '/checklists/screaming-frog/h1-h2' },
            { text: 'Перелинковка', link: '/checklists/screaming-frog/internal-links' },
            { text: 'Пагинация', link: '/checklists/screaming-frog/pagination' },
            { text: 'Фильтры', link: '/checklists/screaming-frog/filters' },
          ],
        },
        {
          text: 'Технические факторы',
          collapsible: true, // можно сворачивать
          collapsed: true, // по умолчанию раскрыта
          items: [
            { text: 'Robots', link: '/checklists/technical/robots' },
            { text: 'Canonical и дубли', link: '/checklists/technical/canonical' },
            { text: 'Sitemap.xml', link: '/checklists/technical/sitemap-xml' },
            { text: 'HTTP статусы', link: '/checklists/technical/http-statuses' },
            { text: 'HTTP статусы для e-com', link: '/checklists/technical/http-statuses-e-com' },
            { text: 'Core Web Vitals', link: '/checklists/technical/core-web-vitals' },
            { text: 'Mobile-first', link: '/checklists/technical/mobile-first' },
            { text: 'Soft 404', link: '/checklists/technical/soft-404' },
            { text: 'Микроразметка', link: '/checklists/technical/micro-markup' },
            { text: 'Перелинковка', link: '/checklists/technical/internal-links' },
            { text: 'HTTPS и безопасность', link: '/checklists/technical/https' },
            { text: 'Архитектура URL', link: '/checklists/technical/url-architecture' },
          ],
        },
        {
          text: 'Факторы контента',
          collapsible: true,
          collapsed: true,
          items: [
            // { text: 'Проверка canonical', link: '/checklists/canonical' },
            // { text: 'Устранение дублей', link: '/checklists/duplicates' },
          ],
        },
      ],
      guides: [
        {
          text: 'Компоненты',
          items: [
            { text: 'Введение', link: '/guides/components/introduction' },
            { text: 'Tabs', link: '/guides/components/tabs' },
            { text: 'Accordions', link: '/guides/components/accordions' },
            { text: 'View switcher', link: '/guides/components/view-switcher' },
            { text: 'Pagination', link: '/guides/components/pagination' },
            { text: 'Breadcrumbs', link: '/guides/components/breadcrumbs' },
            { text: 'Anchor navigation', link: '/guides/components/anchor-navigation' },
            { text: 'Dropdowns', link: '/guides/components/dropdowns' },
            { text: 'Filters', link: '/guides/components/filters' },
          ],
        },
        {
          text: 'Структурированные данные',
          items: [{ text: 'Введение', link: '/guides/structured-data/introduction' }],
        },
        {
          text: 'Техничка',
          items: [
            // { text: 'Табы', link: '/guides/technical/tabs' },
            { text: 'X-Robots-Tag', link: '/guides/technical/x-robots-tag' },
          ],
        },
      ],
      docs: [
        { text: 'Canonical и дубли', link: '/docs/technical-seo/canonical' },
        { text: 'Robots vs Noindex', link: '/docs/technical-seo/robots-vs-noindex' },
        // { text: 'Anchor', link: '/docs/internal/anchor' },
      ],
    },

    // socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
