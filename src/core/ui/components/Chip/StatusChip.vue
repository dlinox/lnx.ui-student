<template>
  <v-chip :color="props.value ? props.colorTrue : props.colorFalse">
    {{ props.value ? props.textTrue : props.textFalse }}
  </v-chip>
</template>
<script setup lang="ts">
const props = defineProps({
  colorTrue: {
    type: String,
    default: "info",
  },
  colorFalse: {
    type: String,
    default: "error",
  },
  textTrue: {
    type: String,
    default: "Activo",
  },
  textFalse: {
    type: String,
    default: "Inactivo",
  },
  value: {
    type: Boolean,
    required: true,
  },
});
</script>
