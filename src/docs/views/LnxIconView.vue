<template>
  <v-container fluid>

    <v-row>
      <v-col
      v-for="iconName in iconNames"
      :key="iconName"
      cols="4"
      sm="3"
      md="2"
      lg="1"
      >
      <div class="icons-container">
        <lnx-icon size="x-large" :icon-name="iconName" />
        <span>{{ iconName }}</span>
      </div>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup lang="ts">
import { iconNames } from "@/core/constans/icons.constants";
import LnxIcon from "@/core/ui/components/icons/LnxIcon.vue";
</script>
<style>
.icons-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem;

  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
  span {
    padding-top: 0.5rem;
    font-size: 0.75rem;
  }
}
</style>
