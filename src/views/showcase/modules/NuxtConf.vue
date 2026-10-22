<template>
  <main class="showcase-page">
    <section class="section-shell page-shell">
      <div class="module-breadcrumb">
        <NuxtLink to="/modules">Modules</NuxtLink>
        <span>/</span>
        <strong>nuxt-conf</strong>
      </div>

      <header class="module-header">
        <div>
          <p class="eyebrow">Configuration</p>
          <div class="title-row">
            <h1>nuxt-conf</h1>
            <span>local module</span>
          </div>
          <p class="description">
            读取 config/env 下的 TypeScript 配置，并自动接入 Nuxt 的配置体系。
          </p>
        </div>
        <span class="status-pill"><i /> Ready</span>
      </header>

      <section class="overview-panel">
        <div class="panel-heading">
          <span>Configuration flow</span>
          <code>config/env → Nuxt</code>
        </div>
        <div class="flow-row">
          <div class="flow-node">
            <span class="flow-index">01</span>
            <strong>Environment file</strong>
            <code>env.development.ts</code>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-node flow-node-active">
            <span class="flow-index">02</span>
            <strong>nuxt-conf</strong>
            <code>load · split · map</code>
          </div>
          <div class="flow-arrow">→</div>
          <div class="flow-node">
            <span class="flow-index">03</span>
            <strong>Nuxt options</strong>
            <code>appConfig · runtimeConfig</code>
          </div>
        </div>
      </section>

      <section class="section-block">
        <div class="section-title">
          <p class="eyebrow">Live values</p>
          <h2>当前环境配置</h2>
          <p>这些值来自当前项目的 config/env 配置文件。</p>
        </div>

        <div class="object-grid">
          <article class="object-card">
            <div class="object-card-heading">
              <span>appConfig</span>
              <code>useAppConfig()</code>
            </div>
            <pre>{{ appConfigText }}</pre>
          </article>
          <article class="object-card">
            <div class="object-card-heading">
              <span>runtimeConfig</span>
              <code>useRuntimeConfig()</code>
            </div>
            <pre>{{ runtimeConfigText }}</pre>
          </article>
        </div>
      </section>

      <section class="section-block">
        <div class="section-title">
          <p class="eyebrow">Built-in behavior</p>
          <h2>不需要重复声明</h2>
          <p>模块会自动处理公共配置、完整 runtimeConfig 和 CDN 地址。</p>
        </div>

        <div class="behavior-grid">
          <article
            v-for="item in behaviors"
            :key="item.title"
            class="behavior-card"
          >
            <span>{{ item.number }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <section class="section-block code-section">
        <div class="section-title">
          <p class="eyebrow">Usage</p>
          <h2>只注册一次</h2>
          <p>Nuxt options 的映射用于把配置交给其他 Nuxt Module。</p>
        </div>
        <pre class="config-code"><code>modules: [
  ['~/modules/conf/module', {
    nuxtOptions: {
      proxy: 'proxy',
      multiCache: 'multiCache',
    },
  }],
]</code></pre>
      </section>

      <NuxtLink
        to="/modules"
        class="back-link"
      >← 返回模块列表</NuxtLink>
    </section>
  </main>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ShowcaseNuxtConf' })

const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()

const appConfigText = computed(() => JSON.stringify(appConfig, null, 2))
const runtimeConfigText = computed(() => JSON.stringify(runtimeConfig, null, 2))

const behaviors = [
  {
    number: '01',
    title: '自动加载',
    description: '根据 NUXT_APP_ENV 选择 env.development、env.ft 或 env.production。',
  },
  {
    number: '02',
    title: '完整 runtimeConfig',
    description: '所有配置都保留在 runtimeConfig 根级，不区分 public 和 private。',
  },
  {
    number: '03',
    title: 'CDN 处理',
    description: '配置 NUXT_APP_CDN_BASE_URL 后，自动生成版本号和 Nuxt app.cdnURL。',
  },
]
</script>

<style lang="scss" scoped>
@use '../styles' as *;

.page-shell {
  min-height: 100vh;
  padding-bottom: 80px;
}
.module-breadcrumb {
  display: flex;
  gap: 9px;
  padding-top: 28px;
  color: $soft;
  font-size: 12px;
}
.module-breadcrumb a:hover {
  color: $ink;
}
.module-breadcrumb strong {
  color: $muted;
  font-weight: 700;
}
.module-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-top: 90px;
}
.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
}
.title-row h1 {
  margin: 0;
  font-size: clamp(31px, 5vw, 56px);
  letter-spacing: -0.07em;
}
.title-row span {
  border-radius: 99px;
  padding: 6px 8px;
  color: $muted;
  background: #efeeec;
  font-size: 10px;
  font-weight: 800;
}
.description {
  margin: 18px 0 0;
  color: $muted;
  font-size: 16px;
  line-height: 1.7;
}
.status-pill {
  border-radius: 99px;
  padding: 7px 10px;
  color: #579377;
  background: #eaf5ef;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}
.status-pill i {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin-right: 5px;
  border-radius: 50%;
  background: currentColor;
  vertical-align: 1px;
}
.overview-panel {
  margin-top: 42px;
  border-radius: 22px;
  padding: 28px;
  color: #f5f3ff;
  background: #171821;
}
.panel-heading {
  display: flex;
  justify-content: space-between;
  color: #b8b5c8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.panel-heading code {
  color: #afa7ff;
  font-size: 11px;
  letter-spacing: 0;
  text-transform: none;
}
.flow-row {
  display: grid;
  grid-template-columns: 1fr 34px 1fr 34px 1fr;
  align-items: center;
  gap: 12px;
  margin-top: 30px;
}
.flow-node {
  min-height: 112px;
  border: 1px solid #343545;
  border-radius: 14px;
  padding: 16px;
  background: #20212c;
}
.flow-node-active {
  border-color: #7568ee;
  background: #27243f;
}
.flow-index {
  display: block;
  margin-bottom: 24px;
  color: #8277ff;
  font-size: 10px;
  font-weight: 800;
}
.flow-node strong,
.flow-node code {
  display: block;
}
.flow-node strong {
  font-size: 14px;
}
.flow-node code {
  margin-top: 7px;
  color: #a7a4b7;
  font-size: 11px;
}
.flow-arrow {
  color: #8277ff;
  font-size: 22px;
  text-align: center;
}
.section-block {
  margin-top: 82px;
}
.section-title h2 {
  margin: 15px 0 8px;
  font-size: clamp(26px, 4vw, 38px);
  letter-spacing: -0.06em;
}
.section-title > p:last-child {
  margin: 0;
  color: $muted;
  font-size: 14px;
  line-height: 1.7;
}
.object-grid,
.behavior-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 28px;
}
.object-card,
.behavior-card {
  border: 1px solid $line;
  border-radius: 15px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.66);
}
.object-card-heading > span,
.behavior-card > span {
  color: $accent;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.object-card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.object-card-heading code {
  color: $soft;
  font-size: 11px;
}
.object-card pre {
  min-height: 220px;
  max-height: 320px;
  overflow: auto;
  margin: 18px 0 0;
  border-radius: 11px;
  padding: 16px;
  color: $ink;
  background: #f4f1ff;
  font-size: 12px;
  line-height: 1.7;
  white-space: pre-wrap;
  word-break: break-word;
}
.value-card code {
  display: block;
  margin-top: 12px;
  color: $soft;
  font-size: 11px;
}
.behavior-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.behavior-card {
  display: flex;
  gap: 15px;
}
.behavior-card > span {
  flex: 0 0 auto;
}
.behavior-card h3 {
  margin: 0;
  font-size: 16px;
}
.behavior-card p {
  margin: 9px 0 0;
  color: $muted;
  font-size: 13px;
  line-height: 1.65;
}
.config-code {
  overflow-x: auto;
  margin: 28px 0 0;
  border-radius: 15px;
  padding: 22px;
  color: #d9d6ff;
  background: #171821;
  font-size: 12px;
  line-height: 1.8;
}
.back-link {
  display: inline-block;
  margin-top: 50px;
  color: $muted;
  font-size: 14px;
  font-weight: 700;
}
@media (max-width: 700px) {
  .module-header {
    flex-direction: column;
    margin-top: 60px;
  }
  .overview-panel {
    padding: 20px;
  }
  .flow-row {
    grid-template-columns: 1fr;
  }
  .flow-arrow {
    transform: rotate(90deg);
  }
  .object-grid,
  .behavior-grid {
    grid-template-columns: 1fr;
  }
}
</style>
