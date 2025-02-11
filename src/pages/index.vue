<template>
  <div class="pa-16">
    <div>
      <span>{{ $t('welcome') }}</span>
      <span>{{ $t('hello') }}</span>
    </div>

    <button @click="handleTo('/', 'fr')">
      fr
    </button>
    <button @click="handleTo('/', 'en')">
      en
    </button>
    <button @click="handleLogin">
      login
    </button>

    <div>{{ userInfoLoading }}</div>
    <div>
      {{ userInfo }}
    </div>
    <div>
      <button @click="handleRefreshUserData">
        refresh user data
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserApi } from '@/composables/api/modules/user'
import { useSiteStore } from '@/store/site'

definePageMeta({
  layout: 'default',
  title: 'Home',
  pageName: 'index',
})

const route = useRoute()

useHead({
  title: route.meta.title as string,
})

const localePath = useLocalePath()

const handleTo = (path: string, lang: 'en' | 'fr') => {
  const url = localePath(path, lang)

  navigateTo(url)
}

const cookieLocale = useCookieLocale()
const nuxtApp = useNuxtApp()

onMounted(() => {
  nuxtApp.$i18n.mergeLocaleMessage(cookieLocale.value, {
    hello: `Hello ${cookieLocale.value}`,
  })

  console.log(nuxtApp)
})

const UserApi = useUserApi()
const SiteStore = useSiteStore()

const handleLogin = async () => {
  const { code, data } = await UserApi.login({
    username: 'jhhs',
    password: '123456',
  })

  if (code === 0) {
    SiteStore.SET_TOKEN(data.accessToken)
  }
}

const { data, status, refresh } = await useAsyncData('user-data', () => UserApi.getUserInfo())

const userInfo = computed(() => data.value)
const userInfoLoading = computed(() => status.value)

const handleRefreshUserData = () => {
  refresh()
}
</script>
