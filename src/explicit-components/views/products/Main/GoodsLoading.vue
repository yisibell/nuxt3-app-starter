<template>
  <v-row>
    <v-col
      v-for="(v, i) in 18"
      :key="i"
      :cols="6"
      :md="4"
      :xl="2"
    >
      <v-skeleton-loader
        type="image, article"
      />
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>

</script>
