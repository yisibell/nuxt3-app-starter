<template>
  <div>
    <h1 class="text-subtitle-1 mb-2 text-grey font-weight-bold">
      收货方式
    </h1>
    <v-card
      variant="outlined"
      color="grey-lighten-2"
      class="py-8"
    >
      <v-card-text class="d-flex">
        <div
          v-for="(v, i) in items"
          :key="i"
          :class="[{ checked: v.value === checked, disabled }, 'chip-item']"
          @click="handleClick(v.value)"
        >
          <v-icon
            v-if="v.value === checked"
            color="primary"
            class="mr-3"
          >
            mdi-checkbox-marked-circle
          </v-icon>

          <span> {{ v.label }} </span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean
}>(), {
  disabled: false,
})

const checked = defineModel<number>({ default: 1 })

const handleClick = (val: number) => {
  if (props.disabled) return

  checked.value = val
}

const items = [
  { label: '物流配送', value: 1 },
  { label: '自 提', value: 2 },
]
</script>

<style lang="scss" scoped>
.chip-item {
  height: 38px;
  min-width: 180px;
  border: 1px solid #ccc;
  margin-right: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &.checked {
    border-color: rgb(var(--v-theme-primary));
    color: rgb(var(--v-theme-primary));
  }

  &.disabled {
    cursor: default;
  }
}
</style>
