<template>
  <div
    ref="countdownBarContainer"
    class="countdown-bar"
  />
</template>

<script lang="ts" setup>
import { createCountdownBar } from 'countdownbar'
import type { CountdownBarInstance } from 'countdownbar'

const props = withDefaults(defineProps<{
  /** 倒计时时间 */
  time: number
}>(), {
  time: 0,
})

const countdownInstance = ref<CountdownBarInstance>()
const countdownBarContainer = ref<HTMLElement>()

const init = () => {
  if (countdownBarContainer.value) {
    countdownInstance.value = createCountdownBar({
      container: countdownBarContainer.value,
      time: props.time,
      template(currentTime) {
        return `  
          <div>
            <span class="text-grey">剩余</span>
            <span class="text-error">${currentTime.days} 天 ${currentTime.hours} 时 ${currentTime.minutes} 分 ${currentTime.seconds} 秒</span>
            <span class="text-grey">自动签收</span>
          </div>
        `
      },
    })
  }
}

watch(() => props.time, () => {
  init()
})

onMounted(() => {
  init()
})
</script>
