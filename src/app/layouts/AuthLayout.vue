<template>
  <v-app id="inspire">
    <v-main class="auth-layout-main"> 
        <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts"></script>
<style>
.auth-layout-main {
  height: 100vh;
  width: 100%;
  background-image: url("/resources/images/auth-background.jpg");
  background-size: cover;
  background-position: center center;
}
</style>
