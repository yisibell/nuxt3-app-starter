<template>
  <div>
    <h3>Counter Demo</h3>
    <span>{{ CounterStore.count }}</span>
    <button type="button" @click="CounterStore.increment">increment</button>

    <div>
      <button type="button" @click="goHome">Go home</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/store/counter'

const CounterStore = useCounterStore()

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>
