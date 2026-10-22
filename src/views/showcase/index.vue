<template>
  <main class="showcase-page">
    <section class="hero section-shell">
      <nav class="nav-bar">
        <NuxtLink
          to="/"
          class="brand"
        >
          <span class="brand-mark">N</span>
          <span>Nuxt Starter</span>
        </NuxtLink>

        <div class="nav-links">
          <NuxtLink to="/modules">Modules</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
        </div>
      </nav>

      <div class="hero-content">
        <div class="hero-copy">
          <p class="eyebrow">
            <span /> A thoughtful Nuxt foundation
          </p>
          <h1>Build something<br><em>remarkable.</em></h1>
          <p class="hero-description">
            一个轻盈、清晰、可持续扩展的 Nuxt 3 应用模板。把基础设施准备好，把精力留给真正重要的产品体验。
          </p>
          <div class="hero-actions">
            <NuxtLink
              to="/modules"
              class="button button-primary"
            >查看模块 <span>↗</span></NuxtLink>
            <NuxtLink
              to="/about"
              class="button button-quiet"
            >了解模板</NuxtLink>
          </div>
        </div>

        <div
          class="hero-orbit"
          aria-hidden="true"
        >
          <div class="orbit orbit-one" />
          <div class="orbit orbit-two" />
          <div class="orbit-core">
            N<span>3</span>
          </div>
          <div class="orbit-dot dot-one" />
          <div class="orbit-dot dot-two" />
          <div class="orbit-dot dot-three" />
        </div>
      </div>

      <div class="stack-row">
        <span class="stack-label">POWERED BY</span>
        <span
          v-for="item in stack"
          :key="item"
          class="stack-pill"
        >{{ item }}</span>
      </div>
    </section>

    <section class="features-section section-shell">
      <div class="section-heading">
        <div>
          <p class="eyebrow">
            What’s inside
          </p>
          <h2>Everything you need<br><em>to start well.</em></h2>
        </div>
        <p>从开发体验到生产部署，常用能力已经整理成清晰的扩展边界。</p>
      </div>

      <div class="feature-grid">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="feature-card"
        >
          <span class="feature-icon">{{ feature.icon }}</span>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.text }}</p>
        </article>
      </div>
    </section>

    <footer class="site-footer section-shell">
      <span>Nuxt Starter <small>v1.9.0</small></span>
      <span>Designed for the next idea.</span>
    </footer>
  </main>
</template>

<script lang="ts" setup>
import { features, stack } from './data'

defineOptions({ name: 'ShowcaseHome' })
</script>

<style lang="scss" scoped>
@use './styles' as *;

.hero {
  min-height: 680px;
}
.hero-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
  padding: 104px 0 82px;
}
.hero-copy {
  max-width: 610px;
}
.hero h1 {
  margin: 22px 0;
  font-size: clamp(54px, 7vw, 92px);
  line-height: 0.98;
  letter-spacing: -0.07em;
}
.hero h1 em,
h2 em {
  color: $accent;
  font-style: normal;
}
.hero-description {
  max-width: 480px;
  color: $muted;
  font-size: 17px;
  line-height: 1.8;
}
.hero-actions {
  display: flex;
  gap: 14px;
  margin-top: 34px;
}
.button {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  border-radius: 10px;
  padding: 14px 20px;
  font-weight: 700;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}
.button:hover {
  transform: translateY(-2px);
}
.button-primary {
  color: white;
  background: $ink;
  box-shadow: 0 12px 24px rgba(24, 25, 34, 0.15);
}
.button-quiet {
  color: $ink;
  background: #f1f0ed;
}
.hero-orbit {
  position: relative;
  width: min(38vw, 390px);
  aspect-ratio: 1;
  margin-right: 5%;
}
.orbit {
  position: absolute;
  inset: 8%;
  border: 1px solid rgba(121, 104, 255, 0.25);
  border-radius: 50%;
  transform: rotate(-24deg) scaleY(0.52);
}
.orbit-two {
  inset: 18%;
  transform: rotate(55deg) scaleY(0.52);
  border-color: rgba(245, 139, 110, 0.32);
}
.orbit-core {
  position: absolute;
  inset: 34%;
  display: grid;
  place-content: center;
  border-radius: 50%;
  color: white;
  background: linear-gradient(145deg, #7b6dff, #4d41c7);
  box-shadow: 0 24px 60px rgba(87, 73, 224, 0.3);
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -0.12em;
}
.orbit-core span {
  color: #f8b29d;
  font-size: 23px;
  vertical-align: top;
}
.orbit-dot {
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: $coral;
  box-shadow: 0 0 0 8px rgba(245, 139, 110, 0.12);
}
.dot-one {
  top: 14%;
  right: 16%;
}
.dot-two {
  bottom: 18%;
  left: 8%;
  background: $accent;
}
.dot-three {
  top: 43%;
  right: -1%;
  width: 8px;
  height: 8px;
}
.stack-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  border-top: 1px solid $line;
  padding: 23px 0;
}
.stack-label {
  margin-right: 10px;
  color: $soft;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
}
.stack-pill {
  color: $muted;
  font-size: 13px;
}
.stack-pill:not(:last-child)::after {
  content: '·';
  margin-left: 10px;
  color: $soft;
}
.features-section {
  padding: 105px 0;
}
.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 42px;
}
.section-heading h2 {
  margin: 13px 0 0;
  font-size: clamp(34px, 4vw, 52px);
  line-height: 1.06;
  letter-spacing: -0.055em;
}
.section-heading > p {
  max-width: 300px;
  color: $muted;
  line-height: 1.7;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.feature-card {
  min-height: 205px;
  padding: 25px;
  border: 1px solid $line;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.58);
  transition:
    transform 0.2s,
    border-color 0.2s;
}
.feature-card:hover {
  border-color: rgba(121, 104, 255, 0.45);
  transform: translateY(-4px);
}
.feature-icon {
  display: grid;
  place-content: center;
  width: 35px;
  height: 35px;
  border-radius: 10px;
  color: $accent;
  background: #efedff;
  font-size: 17px;
  font-weight: 800;
}
.feature-card h3 {
  margin: 28px 0 9px;
  font-size: 17px;
}
.feature-card p {
  margin: 0;
  color: $muted;
  font-size: 14px;
  line-height: 1.65;
}
.site-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid $line;
  padding: 23px 0 32px;
  color: $muted;
  font-size: 13px;
}
.site-footer small {
  margin-left: 7px;
  color: $soft;
}
@media (max-width: 760px) {
  .nav-links {
    gap: 15px;
  }
  .hero-content {
    padding: 70px 0 55px;
  }
  .hero-orbit {
    display: none;
  }
  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
  .site-footer {
    gap: 14px;
    flex-direction: column;
  }
}
</style>
