<template>
  <svg :width="size[props.size]" :height="size[props.size]">
    <use :xlink:href="`/resources/icons/sprite.svg#icon-${iconName}`"></use>
  </svg>
</template>
<script setup lang="ts">
import { type IconName } from "@/core/constans/icons.constants";
const props = withDefaults(
  defineProps<{ iconName: IconName; size?: string }>(),
  {
    size: "small",
  }
);

const size: Record<string, string> = {
  "x-small": "16",
  small: "20",
  medium: "24",
  large: "28",
  "x-large": "32",
};
</script>
