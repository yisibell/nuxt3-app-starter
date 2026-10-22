<template>
  <main class="showcase-page">
    <section class="section-shell page-shell">
      <div class="module-breadcrumb">
        <NuxtLink to="/modules">Modules</NuxtLink>
        <span>/</span>
        <strong>nuxt-spritesmith</strong>
      </div>

      <header class="module-header">
        <div>
          <p class="eyebrow">
            Assets &amp; Performance
          </p>
          <div class="title-row">
            <h1>nuxt-spritesmith</h1>
            <span>v2.1.1</span>
          </div>
          <p class="description">
            将多个 PNG 资源合并成精灵图，并自动生成可复用的 CSS class。
          </p>
        </div>
        <span class="status-pill"><i /> Ready</span>
      </header>

      <section class="sprite-panel">
        <div class="panel-heading">
          <span>Generated sprite sheets</span>
          <code>src/assets/sprites</code>
        </div>
        <div class="sheet-grid">
          <div class="sheet-card">
            <div class="sheet-preview sheet-preview-icon">
              <img
                src="/sprites/icon.png"
                alt="Generated icon sprite sheet"
              >
            </div>
            <div class="sheet-meta">
              <strong>icon.png</strong><span>UI icons</span>
            </div>
          </div>
          <div class="sheet-card">
            <div class="sheet-preview sheet-preview-currency">
              <img
                src="/sprites/currency.png"
                alt="Generated currency sprite sheet"
              >
            </div>
            <div class="sheet-meta">
              <strong>currency.png</strong><span>Currency icons</span>
            </div>
          </div>
          <div class="sheet-card">
            <div class="sheet-preview sheet-preview-payment">
              <img
                src="/sprites/payment.png"
                alt="Generated payment sprite sheet"
              >
            </div>
            <div class="sheet-meta">
              <strong>payment.png</strong><span>Payment icons</span>
            </div>
          </div>
        </div>
      </section>

      <section class="usage-section">
        <div class="section-title">
          <p class="eyebrow">
            Usage
          </p>
          <h2>通过 class 使用精灵图</h2>
          <p>目录名会成为前缀，文件名会成为具体图标 class。</p>
        </div>
        <div class="usage-grid">
          <article class="usage-card">
            <div class="usage-label">
              <span>01</span> UI icon
            </div>
            <div class="usage-preview">
              <span class="sprite-icon sprite-icon--fail" />
              <span class="sprite-icon sprite-icon--success-check" />
              <span class="sprite-icon sprite-icon--video-play-36" />
            </div>
            <pre><code>sprite-icon--fail
sprite-icon--success-check
sprite-icon--video-play-36</code></pre>
          </article>
          <article class="usage-card">
            <div class="usage-label">
              <span>02</span> Currency
            </div>
            <div class="usage-preview">
              <span class="sprite-currency sprite-currency--USD" />
              <span class="sprite-currency sprite-currency--EUR" />
              <span class="sprite-currency sprite-currency--JPY" />
            </div>
            <pre><code>sprite-currency--USD
sprite-currency--EUR
sprite-currency--JPY</code></pre>
          </article>
          <article class="usage-card">
            <div class="usage-label">
              <span>03</span> Payment
            </div>
            <div class="usage-preview">
              <span class="sprite-payment sprite-payment--Visa" />
              <span class="sprite-payment sprite-payment--MasterCard" />
              <span class="sprite-payment sprite-payment--paypal" />
            </div>
            <pre><code>sprite-payment--Visa
sprite-payment--MasterCard
sprite-payment--paypal</code></pre>
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
defineOptions({ name: 'ShowcaseNuxtSpritesmith' })
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
  margin-right: 4px;
  border-radius: 50%;
  vertical-align: 1px;
  background: #63b187;
}
.sprite-panel {
  margin-top: 45px;
  border-radius: 16px;
  padding: 23px 26px 28px;
  color: white;
  background: $ink;
}
.panel-heading {
  display: flex;
  justify-content: space-between;
  color: #a6a6b3;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.panel-heading code {
  color: #aaa4ff;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}
.sheet-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 25px;
}
.sheet-card {
  overflow: hidden;
  border: 1px solid #373743;
  border-radius: 11px;
  background: #22232c;
}
.sheet-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  min-height: 138px;
  padding: 12px 10px 22px;
}
.sheet-preview img {
  display: block;
  width: auto;
  max-width: 100%;
  height: 100px;
  object-fit: contain;
}
.sheet-preview-icon {
  background: #2a2940;
}
.sheet-preview-currency {
  background: #283a38;
}
.sheet-preview-payment {
  background: #3a3030;
}
.sheet-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-top: 1px solid #373743;
  padding: 15px 12px;
}
.sheet-meta strong {
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
}
.sheet-meta span {
  color: #858592;
  font-size: 10px;
}
.usage-section {
  margin-top: 76px;
}
.section-title h2 {
  margin: 13px 0 10px;
  font-size: 30px;
  letter-spacing: -0.05em;
}
.section-title > p:last-child {
  margin: 0;
  color: $muted;
  font-size: 14px;
  line-height: 1.7;
}
.usage-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 28px;
}
.usage-card {
  border: 1px solid $line;
  border-radius: 14px;
  padding: 20px;
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
.usage-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  min-height: 90px;
  margin: 16px 0 20px;
  padding: 8px 0;
}
.usage-card pre {
  overflow-x: auto;
  margin: 0;
  border-radius: 9px;
  padding: 12px;
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
@media (max-width: 720px) {
  .module-header {
    flex-direction: column;
    margin-top: 60px;
  }
  .sheet-grid,
  .usage-grid {
    grid-template-columns: 1fr;
  }
}
</style>
