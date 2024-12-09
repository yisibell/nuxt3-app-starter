<template>
  <el-input-number
    :key="inputNumberKey"
    :model-value="inputNumber"
    :size="size"
    :max="max"
    :min="min"
    :step="step"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
const inputNumber = defineModel<number>()

const props = withDefaults(defineProps<{
  strictStep?: boolean
  step?: number
  min?: number
  max?: number
  size?: | 'small' | 'default' | 'large'
}>(), {
  strictStep: false,
  step: 1,
  min: 0,
  max: 99999,
  size: 'small',
})

const emit = defineEmits(['change'])

const { strictStep, step, min, max } = toRefs(props)

const inputNumberKey = ref(+new Date())
const forceUpdateInputNumberKey = () => {
  inputNumberKey.value = +new Date()
}

const formatToStrictStepValue = (num: number) => {
  const mo = num % step.value

  if (mo === 0) return num
  else {
    const decimal = Number.parseFloat((num - Number.parseInt(num.toString())).toString())

    if (decimal <= step.value) return Number.parseFloat((Number.parseInt(num.toString()) + step.value).toString())

    return Math.ceil(num)
  }
}

const formatValue = (str: string | number) => {
  let num = typeof str === 'number' ? str : Number.parseFloat(str)

  // 严格步数
  if (strictStep.value) {
    num = formatToStrictStepValue(num)
  }

  // 控制范围
  if (num < min.value) {
    num = min.value
  }
  else if (num > max.value) {
    num = max.value
  }

  return num
}

const handleInput = (value?: number) => {
  inputNumber.value = formatValue(value || '')

  forceUpdateInputNumberKey()
}

const handleChange = (value?: number) => {
  handleInput(value)
  emit('change', value)
}
</script>
