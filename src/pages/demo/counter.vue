<template>
  <div>
    <h3>Counter Demo</h3>

    <div>current token: {{ siteStore.token }}</div>

    <span>{{ CounterStore.count }}: </span>

    <button type="button" @click="CounterStore.increment">increment</button>

    <div>
      <button type="button" @click="goHome">Go home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/store/counter'
import { useSiteStore } from '~/store/site'

const CounterStore = useCounterStore()

const router = useRouter()

const siteStore = useSiteStore()

const goHome = () => {
  router.push('/')
}
</script>
