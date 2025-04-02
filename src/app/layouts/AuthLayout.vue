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
  background-image: url("/resources/images/bg7.png");
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(220, 220, 220, 0.5);
    backdrop-filter: blur(80px);
  }
}
</style>
