<template>
  <router-view />
</template>
<script setup lang="ts">
import { setIdentificationCookie } from "@/core/utils/session.utils";

const setCookie = () => {
  setIdentificationCookie();
};

const initApp = () => {
  setCookie();
};

initApp();
</script>
