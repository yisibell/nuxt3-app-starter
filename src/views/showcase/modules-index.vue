<template>
  <main class="showcase-page">
    <section class="section-shell page-shell">
      <ShowcaseHeader
        title="Modules"
        description="已接入模块的独立演示入口。每个模块都有自己的页面、预览和使用说明。"
      />

      <div class="module-list">
        <NuxtLink
          v-for="module in moduleDemos"
          :key="module.id"
          :to="`/modules/${module.id}`"
          class="module-card"
        >
          <div class="module-card-icon">✦</div>
          <div class="module-card-content">
            <div class="module-card-topline">
              <span>{{ module.label }}</span>
              <small>v{{ module.version }}</small>
            </div>
            <h2>{{ module.name }}</h2>
            <p>{{ module.description }}</p>
          </div>
          <span class="module-card-arrow">↗</span>
        </NuxtLink>
      </div>

      <NuxtLink
        to="/"
        class="back-link"
      >← 返回首页</NuxtLink>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { moduleDemos } from './data'

defineOptions({ name: 'ShowcaseModulesIndex' })
</script>

<style lang="scss" scoped>
@use './styles' as *;

.page-shell {
  min-height: 100vh;
  padding-bottom: 80px;
}
.module-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 84px;
}
.module-card {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  min-height: 220px;
  border: 1px solid $line;
  border-radius: 16px;
  padding: 25px;
  color: $ink;
  background: rgba(255, 255, 255, 0.68);
  transition:
    border-color 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.module-card[href]:hover {
  border-color: rgba(117, 104, 238, 0.45);
  box-shadow: 0 16px 30px rgba(40, 37, 80, 0.08);
  transform: translateY(-3px);
}
.module-card-icon {
  display: grid;
  flex: 0 0 auto;
  place-content: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  color: $accent;
  background: #efedff;
  font-size: 18px;
  font-weight: 800;
}
.module-card-content {
  min-width: 0;
}
.module-card-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: $accent;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.module-card-topline small {
  color: $soft;
  font-size: 10px;
  letter-spacing: 0;
}
.module-card h2 {
  margin: 22px 0 10px;
  font-size: 23px;
  letter-spacing: -0.04em;
}
.module-card p {
  max-width: 360px;
  margin: 0;
  color: $muted;
  font-size: 13px;
  line-height: 1.7;
}
.module-card-arrow {
  margin-left: auto;
  color: $soft;
  font-size: 18px;
}
.back-link {
  display: inline-block;
  margin-top: 50px;
  color: $muted;
  font-size: 14px;
  font-weight: 700;
}
@media (max-width: 700px) {
  .module-list {
    grid-template-columns: 1fr;
    margin-top: 55px;
  }
}
</style>
