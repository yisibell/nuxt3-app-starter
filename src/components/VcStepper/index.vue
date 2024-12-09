<template>
  <v-text-field
    :key="textFieldKey"
    :style="[{ maxWidth }]"
    :model-value="inputValue"
    :hide-details="hideDetails"
    :readonly="readonly"
    color="primary"
    variant="outlined"
    density="compact"
    type="number"
    prepend-inner-icon="mdi-minus"
    append-inner-icon="mdi-plus"
    class="lu-stepper"
    @click:prepend-inner="handleMinus"
    @click:append-inner="handlePlus"
    @update:model-value="handleChange"
  />
</template>

<script setup lang="ts">
import { isEqual } from 'lodash-es'

const { parseFloat, parseInt } = Number

const inputValue = defineModel<string | number>()

const props = withDefaults(defineProps<{
  hideDetails?: boolean
  min?: number
  max?: number
  step?: number
  strictStep?: boolean
  integer?: boolean
  decimalLength?: number
  maxWidth?: string
  readonly?: boolean
}>(), {
  hideDetails: true,
  min: 1,
  max: 99999,
  step: 1,
  strictStep: false,
  integer: true,
  decimalLength: 2,

})

const emit = defineEmits(['change'])

const textFieldKey = ref(+new Date())

const forceUpdateTextField = () => {
  textFieldKey.value = +new Date()
}

// 空数据格式化
const formatEmptyValue = (str: string | number) => {
  return parseFloat(
    Number(str === '' ? '0' : str).toFixed(props.decimalLength),
  )
}

// 严格步数格式化
const formatToStrictStepValue = (num: number) => {
  const mo = num % props.step

  if (mo === 0) return num
  else {
    const decimal = parseFloat((num - parseInt(num.toString())).toString())

    if (decimal <= props.step) return parseFloat((parseInt(num.toString()) + props.step).toString())

    return Math.ceil(num)
  }
}

// 整数格式化
const formatToIntegerValue = (num: string | number) => {
  return parseFloat(parseInt(num.toString()).toFixed(0))
}

const formatValue = (str: string | number) => {
  let tmp = formatEmptyValue(Number(str))

  // 严格步数
  if (props.strictStep) {
    tmp = formatToStrictStepValue(tmp)
  }

  // 保证整数
  if (props.integer && !props.strictStep) {
    tmp = formatToIntegerValue(tmp)
  }

  // 控制范围
  if (tmp < props.min) {
    tmp = props.min
  }
  else if (tmp > props.max) {
    tmp = props.max
  }

  return tmp
}

const handleInput = (value: string | number) => {
  const newValue = formatValue(value)

  if (!isEqual(newValue, inputValue.value)) {
    emit('change', newValue)
  }

  inputValue.value = newValue

  forceUpdateTextField()
}

const handleChange = (value: string) => {
  if (props.readonly) return

  handleInput(value)
}

const handleMinus = () => {
  if (props.readonly) return

  handleInput(Number(inputValue.value) - props.step)
}

const handlePlus = () => {
  if (props.readonly) return

  handleInput(Number(inputValue.value) + props.step)
}
</script>

<style lang="scss" scoped>
$--color: #9e9e9e;

.lu-stepper {
  :deep() {
    .v-input__icon {
      cursor: pointer;

      button {
        color: $--color;
      }
    }

    input {
      text-align: center;
      color: $--color;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
      }
    }
  }
}
</style>
