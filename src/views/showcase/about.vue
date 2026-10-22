<template>
  <main class="showcase-page">
    <section class="section-shell inner-page about-page">
      <ShowcaseHeader
        title="About the starter"
        description="一个不替你做决定，但会让开始变得更从容的 Nuxt 3 模板。"
      />
      <div class="about-copy">
        <p>这个项目把常见的应用基础设施整理在一起：页面路由、组件自动导入、Pinia、统一请求层、多环境配置、服务端中间件以及生产部署脚本。</p>
        <p>你可以保留它的结构，也可以从任何一个页面开始重塑。模板的目标不是增加抽象，而是让每一层职责都足够容易被找到。</p>
      </div>
      <div class="about-meta">
        <span>Nuxt 3.16</span><span>Node 20+</span><span>MIT License</span>
      </div>
      <NuxtLink
        to="/"
        class="back-link"
      >← 返回首页</NuxtLink>
    </section>
  </main>
</template>

<script lang="ts" setup>
defineOptions({ name: 'ShowcaseAbout' })
</script>

<style lang="scss" scoped>
@use './styles' as *;
.inner-page {
  min-height: 100vh;
  padding-bottom: 80px;
}
.about-page {
  max-width: 900px;
}
.about-copy {
  max-width: 660px;
  margin: 80px 0 42px;
  color: $muted;
  font-size: 19px;
  line-height: 1.9;
}
.about-copy p + p {
  margin-top: 24px;
}
.about-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.about-meta span {
  padding: 8px 12px;
  border-radius: 99px;
  color: $accent;
  background: #efedff;
  font-size: 12px;
  font-weight: 700;
}
.back-link {
  display: inline-block;
  margin-top: 50px;
  color: $muted;
  font-size: 14px;
  font-weight: 700;
}
</style>
