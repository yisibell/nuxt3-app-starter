<template>
  <main class="showcase-page">
    <section class="section-shell page-shell">
      <div class="module-breadcrumb">
        <NuxtLink to="/modules">Modules</NuxtLink>
        <span>/</span>
        <strong>nuxt-proxy-request</strong>
      </div>

      <header class="module-header">
        <div>
          <p class="eyebrow">
            Server &amp; Network
          </p>
          <div class="title-row">
            <h1>nuxt-proxy-request</h1>
            <span>v2.1.0</span>
          </div>
          <p class="description">
            统一代理前端 API 请求，开发和生产环境使用同一套调用路径。
          </p>
        </div>
        <span class="status-pill"><i /> Ready</span>
      </header>

      <section class="proxy-panel">
        <div class="panel-heading">
          <span>Request flow</span>
          <code>proxy.options</code>
        </div>
        <div class="flow-row">
          <div class="flow-node">
            <strong>Browser</strong>
            <code>/api2/posts/1</code>
          </div>
          <span class="flow-arrow">→</span>
          <div class="flow-node flow-node-active">
            <strong>Nuxt server</strong>
            <code>nuxt-proxy-request</code>
          </div>
          <span class="flow-arrow">→</span>
          <div class="flow-node">
            <strong>API target</strong>
            <code>pathRewrite: /api2 → /</code>
          </div>
        </div>
        <p class="flow-note">
          浏览器只访问站点自己的 `/api2`，后端地址由 Nuxt 服务端代理转发。
        </p>
      </section>

      <section class="config-section">
        <div class="section-title">
          <p class="eyebrow">
            Configuration
          </p>
          <h2>当前项目的代理配置</h2>
          <p>开发环境使用 `/api2/**` 作为过滤路径，并在转发时移除 `/api2` 前缀。</p>
        </div>
        <pre class="config-code"><code>proxy: {
  options: [
    {
      target: 'https://jsonplaceholder.typicode.com',
      pathRewrite: { '/api2': '' },
      pathFilter: ['/api2/**'],
    },
  ],
}</code></pre>
      </section>

      <section class="request-section">
        <div class="section-title">
          <p class="eyebrow">
            Try it
          </p>
          <h2>发起一次代理请求</h2>
          <p>下面是几个通过 Nuxt 代理转发到 JSONPlaceholder 的请求示例。</p>
        </div>
        <div class="request-list">
          <article
            v-for="example in examples"
            :key="example.path"
            class="request-card"
          >
            <div class="request-card-topline">
              <div class="request-line">
                <span class="method-badge">{{ example.method }}</span>
                <code>{{ example.path }}</code>
              </div>
              <button
                type="button"
                class="request-button"
                :disabled="loadingPath === example.path"
                @click="testProxy(example)"
              >
                {{ loadingPath === example.path ? '请求中…' : '发送请求' }}
                <span>↗</span>
              </button>
            </div>
            <p>{{ example.description }}</p>
            <pre
              v-if="results[example.path]"
              class="result-box"
            ><code>{{ results[example.path] }}</code></pre>
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
import { reactive, ref } from 'vue'
import { useJsonPlaceholderApi } from '~/composables/api/modules/jsonplaceholder'

defineOptions({ name: 'ShowcaseNuxtProxyRequest' })

interface IRequestExample {
  method: 'GET' | 'POST'
  path: string
  description: string
  request: () => Promise<unknown>
}

const JsonPlaceholderApi = useJsonPlaceholderApi()

const examples: IRequestExample[] = [
  {
    method: 'GET',
    path: '/api2/posts/1',
    description: '获取一篇文章详情。',
    request: () => JsonPlaceholderApi.getPost(1),
  },
  {
    method: 'GET',
    path: '/api2/users/1',
    description: '获取一个用户信息。',
    request: () => JsonPlaceholderApi.getUser(1),
  },
  {
    method: 'POST',
    path: '/api2/posts',
    description: '创建一篇文章，JSONPlaceholder 会返回模拟结果。',
    request: () => JsonPlaceholderApi.createPost({
      title: 'Nuxt proxy demo',
      body: 'Hello from Nuxt proxy request',
      userId: 1,
    }),
  },
]

const loadingPath = ref('')
const results = reactive<Record<string, string>>({})

const testProxy = async (example: IRequestExample) => {
  loadingPath.value = example.path

  try {
    const response = await example.request()
    results[example.path] = JSON.stringify(response, null, 2)
  }
  catch (error) {
    results[example.path] = error instanceof Error ? error.message : 'Request failed'
  }
  finally {
    loadingPath.value = ''
  }
}
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
.proxy-panel {
  margin-top: 45px;
  border-radius: 16px;
  padding: 23px 26px 25px;
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
.panel-heading code,
.flow-node code,
.request-line code {
  color: #aaa4ff;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0;
  text-transform: none;
}
.flow-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 38px 8px 24px;
}
.flow-node {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 9px;
  min-height: 76px;
  border: 1px solid #373743;
  border-radius: 10px;
  padding: 16px;
  background: #22232c;
}
.flow-node strong {
  font-size: 13px;
}
.flow-node-active {
  border-color: #7065e8;
  background: #282642;
}
.flow-arrow {
  color: #aaa4ff;
  font-size: 20px;
}
.flow-note {
  margin: 0;
  color: #858592;
  font-size: 12px;
}
.config-section,
.request-section {
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
.config-code,
.result-box {
  overflow-x: auto;
  margin: 28px 0 0;
  border-radius: 12px;
  padding: 20px;
  color: #6256d4;
  background: #f0efff;
  font-size: 12px;
  line-height: 1.7;
}
.request-card {
  margin-top: 12px;
  border: 1px solid $line;
  border-radius: 14px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
}
.request-card:first-child {
  margin-top: 28px;
}
.request-card-topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}
.request-card > p {
  margin: 14px 0 0;
  color: $muted;
  font-size: 13px;
}
.request-line {
  display: flex;
  align-items: center;
  gap: 10px;
}
.method-badge {
  border-radius: 5px;
  padding: 5px 7px;
  color: #579377;
  background: #eaf5ef;
  font-size: 10px;
  font-weight: 800;
}
.request-line code {
  color: $ink;
}
.request-button {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  border: 0;
  border-radius: 8px;
  padding: 11px 15px;
  color: white;
  background: $ink;
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
}
.request-button:disabled {
  cursor: wait;
  opacity: 0.6;
}
.request-button span {
  color: #aaa4ff;
}
.result-box {
  margin-bottom: 0;
  margin-top: 16px;
  color: #55555f;
  background: #f6f5f2;
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
  .flow-row {
    align-items: stretch;
    flex-direction: column;
    gap: 9px;
  }
  .flow-arrow {
    align-self: center;
    transform: rotate(90deg);
  }
  .request-card-topline {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
