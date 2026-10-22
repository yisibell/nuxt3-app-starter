<template>
  <main class="showcase-page">
    <section class="section-shell page-shell">
      <div class="module-breadcrumb">
        <NuxtLink to="/modules">Modules</NuxtLink>
        <span>/</span>
        <strong>nuxt-svg-icons</strong>
      </div>

      <header class="module-header">
        <div>
          <p class="eyebrow">
            Assets &amp; UI
          </p>
          <div class="title-row">
            <h1>nuxt-svg-icons</h1>
            <span>v3.3.1</span>
          </div>
          <p class="description">
            将 <code>assets/icons</code> 中的 SVG 直接转换成可复用的 Nuxt 组件。
          </p>
        </div>
        <span class="status-pill"><i /> Ready</span>
      </header>

      <section class="preview-panel">
        <div class="panel-heading">
          <div>
            <span class="panel-kicker">Live preview</span>
            <strong>Two ways to bring icons in.</strong>
          </div>
          <code>src/assets/icons</code>
        </div>
        <div class="preview-content">
          <div class="icon-card icon-card-date">
            <div class="icon-card-art">
              <NuxtSvgIcon
                name="date"
                size="58"
                color="#7065e8"
                class="global-date-icon"
              />
            </div>
            <div class="icon-card-info">
              <strong>date.svg</strong>
              <code>&lt;NuxtSvgIcon /&gt;</code>
            </div>
          </div>
          <div class="icon-card icon-card-email">
            <div class="icon-card-art">
              <EmailIcon class="demo-icon" />
            </div>
            <div class="icon-card-info">
              <strong>email.svg</strong>
              <code>?component</code>
            </div>
          </div>
          <div class="size-demo">
            <span class="size-label">Size scale</span>
            <div class="size-demo-icons">
              <NuxtSvgIcon
                name="date"
                size="24"
                color="#181922"
                class="size-icon size-small"
              />
              <NuxtSvgIcon
                name="date"
                size="40"
                color="#181922"
                class="size-icon size-medium"
              />
              <NuxtSvgIcon
                name="date"
                size="64"
                color="#181922"
                class="size-icon size-large"
              />
            </div>
            <span class="size-caption">24 / 40 / 64 px</span>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <div class="section-title">
          <p class="eyebrow">
            Usage
          </p>
          <h2>两种使用方式</h2>
        </div>
        <div class="usage-grid">
          <article class="usage-card">
            <div class="usage-label">
              <span>01</span> Global component
            </div>
            <p>在模板中快速引用 assets/icons 下的图标。</p>
            <pre><code>&lt;NuxtSvgIcon
  name="date"
  size="48"
  color="#7065e8"
/&gt;</code></pre>
          </article>
          <article class="usage-card">
            <div class="usage-label">
              <span>02</span> Direct import
            </div>
            <p>需要独立封装时，直接导入 SVG 组件。</p>
            <pre><code>import DateIcon from
'~/assets/icons/date.svg?component'</code></pre>
          </article>
        </div>
      </section>

      <NuxtLink
        to="/modules"
        class="back-link"
      >← 返回模块列表</NuxtLink>
    </section>
  </main>
</template>

<script lang="ts" setup>
import EmailIcon from '~/assets/icons/email.svg?component'

defineOptions({ name: 'ShowcaseNuxtSvgIcons' })
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
  font-size: clamp(34px, 5vw, 58px);
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
.description code {
  color: $accent;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 12px;
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
  margin-right: 4px;
  border-radius: 50%;
  vertical-align: 1px;
  background: #63b187;
}
.preview-panel {
  margin-top: 45px;
  border-radius: 16px;
  padding: 26px;
  background: linear-gradient(135deg, #f1efff 0%, #fff7f1 100%);
}
.panel-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
}
.panel-kicker {
  display: block;
  color: $accent;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.panel-heading strong {
  display: block;
  margin-top: 8px;
  color: $ink;
  font-size: 18px;
  letter-spacing: -0.03em;
}
.panel-heading code {
  color: $muted;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
  font-weight: 400;
}
.preview-content {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 24px;
}
.icon-card {
  display: flex;
  flex: 0 1 220px;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid rgba(117, 104, 238, 0.14);
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.8);
}
.icon-card-art {
  display: grid;
  place-content: center;
  min-height: 108px;
}
.icon-card-date .icon-card-art {
  color: $accent;
  background: #e8e5ff;
}
.global-date-icon :deep(svg) {
  width: 58px !important;
  height: 58px !important;
}
.icon-card-email .icon-card-art {
  color: $coral;
  background: #ffe9df;
}
.demo-icon {
  display: block;
  width: 58px;
  height: 58px;
  fill: currentColor;
}
.icon-card-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid rgba(117, 104, 238, 0.12);
  padding: 11px 13px;
}
.icon-card-info strong {
  color: $ink;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
}
.icon-card-info code,
.size-label,
.size-caption {
  color: $muted;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 10px;
}
.size-demo {
  flex: 1;
  margin-left: auto;
  padding: 12px 10px 12px 24px;
}
.size-demo-icons {
  display: flex;
  align-items: end;
  gap: 16px;
  min-height: 82px;
  margin-top: 6px;
}
.size-icon :deep(svg) {
  width: 24px !important;
  height: 24px !important;
}
.size-icon.size-medium :deep(svg) {
  width: 40px !important;
  height: 40px !important;
}
.size-icon.size-large :deep(svg) {
  width: 64px !important;
  height: 64px !important;
}
.size-caption {
  display: block;
  margin-top: 7px;
}
.usage-section {
  margin-top: 76px;
}
.section-title h2 {
  margin: 13px 0 28px;
  font-size: 30px;
  letter-spacing: -0.05em;
}
.usage-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.usage-card {
  border: 1px solid $line;
  border-radius: 14px;
  padding: 23px;
  background: rgba(255, 255, 255, 0.7);
}
.usage-label {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 13px;
  font-weight: 800;
}
.usage-label span {
  color: $accent;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
}
.usage-card > p {
  margin: 14px 0;
  color: $muted;
  font-size: 13px;
}
.usage-card pre {
  overflow-x: auto;
  margin: 0;
  border-radius: 9px;
  padding: 13px;
  color: #6256d4;
  background: #f0efff;
  font-size: 11px;
  line-height: 1.55;
}
.back-link {
  display: inline-block;
  margin-top: 45px;
  color: $muted;
  font-size: 14px;
  font-weight: 700;
}
@media (max-width: 640px) {
  .module-header {
    flex-direction: column;
    margin-top: 60px;
  }
  .preview-content {
    flex-wrap: wrap;
    gap: 30px;
  }
  .size-demo {
    width: 100%;
    margin: 8px 0 0;
  }
  .usage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
