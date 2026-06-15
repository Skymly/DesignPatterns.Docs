import { defineConfig } from 'vitepress'
import { readSiteMeta } from './site-meta.node'

const siteBuildMeta = readSiteMeta()

const githubDesignPatterns = 'https://github.com/Skymly/DesignPatterns'

const enSidebar = [
  { text: 'Introduction', link: '/' },
  { text: 'About this site', link: '/about-this-site' },
  { text: 'Getting started', link: '/getting-started' },
  {
    text: 'Patterns',
    collapsed: false,
    items: [
      { text: 'Singleton', link: '/singleton' },
      { text: 'Strategy', link: '/strategy' },
      { text: 'Chain of Responsibility', link: '/chain-of-responsibility' },
      { text: 'Composite', link: '/composite' },
      { text: 'Factory Registry', link: '/factory-registry' },
      { text: 'Decorator', link: '/decorator' },
      { text: 'Event Aggregator', link: '/event-aggregator' },
      { text: 'State transition table', link: '/state-transition-table' },
      { text: 'Dependency Injection', link: '/dependency-injection' },
    ],
  },
  { text: 'Diagnostics', link: '/diagnostics' },
  { text: 'Registry key conventions', link: '/registry-key-conventions' },
  { text: 'Samples', link: '/samples' },
  { text: 'Reference & links', link: '/reference' },
]

const zhSidebar = [
  { text: '概览', link: '/zh/' },
  { text: '关于本站', link: '/zh/about-this-site' },
  { text: '快速开始', link: '/zh/getting-started' },
  {
    text: '设计模式',
    collapsed: false,
    items: [
      { text: 'Singleton', link: '/zh/singleton' },
      { text: 'Strategy', link: '/zh/strategy' },
      { text: '责任链', link: '/zh/chain-of-responsibility' },
      { text: 'Composite', link: '/zh/composite' },
      { text: 'Factory Registry', link: '/zh/factory-registry' },
      { text: 'Decorator', link: '/zh/decorator' },
      { text: 'Event Aggregator', link: '/zh/event-aggregator' },
      { text: 'State 转换表', link: '/zh/state-transition-table' },
      { text: '依赖注入', link: '/zh/dependency-injection' },
    ],
  },
  { text: '诊断', link: '/zh/diagnostics' },
  { text: 'Key 命名约定', link: '/zh/registry-key-conventions' },
  { text: '示例', link: '/zh/samples' },
  { text: '参考与链接', link: '/zh/reference' },
]

export default defineConfig({
  srcDir: 'docs',
  vite: {
    define: {
      __SITE_META__: JSON.stringify(siteBuildMeta),
    },
  },
  title: 'DesignPatterns',
  description:
    'Composable .NET design-pattern primitives with Roslyn source generators and compile-time diagnostics',
  base: '/DesignPatterns.Docs/',
  cleanUrls: true,
  lastUpdated: {
    formatOptions: {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZoneName: 'short',
    },
  },
  themeConfig: {
    logo: { text: 'DesignPatterns' },
    socialLinks: [{ icon: 'github', link: githubDesignPatterns }],
    search: { provider: 'local' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Skymly',
    },
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guide', link: '/getting-started' },
          { text: 'Patterns', link: '/strategy' },
          { text: 'Samples', link: '/samples' },
          { text: 'GitHub', link: githubDesignPatterns },
        ],
        sidebar: enSidebar,
        editLink: {
          pattern:
            'https://github.com/Skymly/DesignPatterns.Docs/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        lastUpdatedText: 'Last updated',
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: {
        nav: [
          { text: '指南', link: '/zh/getting-started' },
          { text: '模式', link: '/zh/strategy' },
          { text: '示例', link: '/zh/samples' },
          { text: 'GitHub', link: githubDesignPatterns },
        ],
        sidebar: zhSidebar,
        editLink: {
          pattern:
            'https://github.com/Skymly/DesignPatterns.Docs/edit/main/docs/zh/:path',
          text: '在 GitHub 上编辑此页',
        },
        footer: {
          message: '基于 MIT 许可证发布。',
          copyright: 'Copyright © Skymly',
        },
        lastUpdatedText: '页面最后更新于',
      },
    },
  },
})
