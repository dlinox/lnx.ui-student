<template>
  <v-dialog v-model="dialog" max-width="350" activator="parent" :persistent="true">
    <v-card>
      <v-card-title class="d-flex align-center bg-grey-lighten-4 py-4">
        <LnxIcon iconName="information" />

        <small class="ms-2">
          {{ title }}
        </small>
      </v-card-title>
      <slot></slot>
      <v-card-item class="text-center border-t border-b">
        {{ message }}
      </v-card-item>
      <v-card-actions>
        <v-btn type="button" color="secondary" variant="tonal" @click="onClose" :disabled="loading">
          {{ textCancel }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn type="button" color="primary" variant="flat" @click="onConfirm" :loading="loading">
          {{ textConfirm }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import LnxIcon from "../icons/LnxIcon.vue";

const emit = defineEmits(["onConfirm", "onCancel"]);

defineProps({
  title: {
    type: String,
    required: true,
    default: "Confirmar",
  },
  textCancel: {
    type: String,
    default: "Cancelar",
  },
  textConfirm: {
    type: String,
    default: "Aceptar",
  },
  message: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const dialog = ref<boolean>(false);
const onClose = () => {
  dialog.value = false;
  emit("onCancel");
};
const onConfirm = () => {
  emit("onConfirm");
  dialog.value = false;
};
</script>
