<template>
  <v-app app id="inspire">
    <v-main class="auth-layout-main">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts"></script>
<style>
#inspire {
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(199, 218, 239, 1) 0%,
    rgba(216, 239, 255, 1) 50%,
    rgba(244, 237, 244, 1) 100%
  );

  width: 100%;
  min-height: 100dvh;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(#444 1px, transparent 1px);
    background-size: 4px 4px;
    opacity: 0.05;
    pointer-events: none;
    z-index: 0;
  }
}
</style>
