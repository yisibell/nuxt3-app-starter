<template>
  <el-input-number
    v-model="inputNumber"
    :size="size"
    :max="max"
    :min="min"
    :step="step"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
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
})

const emit = defineEmits(['change', 'update:modelValue'])

const { strictStep, step, min, max } = toRefs(props)

const inputNumber = computed({
  get() {
    return formatValue(props.modelValue)
  },
  set(value) {
    emit('update:modelValue', formatValue(value))
  },
})

const formatToStrictStepValue = (num: number) => {
  const mo = num % step.value

  if (mo === 0) return num
  else {
    const decimal = Number.parseFloat((num - Number.parseInt(num.toString())).toString())

    if (decimal <= step.value) return Number.parseFloat((Number.parseInt(num.toString()) + step.value).toString())

    return Math.ceil(num)
  }
}

const formatValue = (inputValue?: string | number) => {
  if (!inputValue) return props.min

  let num = typeof inputValue === 'number' ? inputValue : Number.parseFloat(inputValue)

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

const handleChange = (value?: number) => {
  emit('change', formatValue(value))
}
</script>
