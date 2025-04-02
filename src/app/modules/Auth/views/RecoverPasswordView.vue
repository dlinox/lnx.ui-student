<template>
  <v-container
    class="h-min-screen h-100 pa-0 d-flex justify-center align-center flex-column"
  >
    <v-form ref="formRef" @submit.prevent="submit" class="h-full">
      <v-card class="" width="400px">
        <v-card-item class="text-center">
          <img src="/resources/images/logo.png" alt="logo" width="70" />
          <h6 class="text-h6 pt-3 text-primary">Recuperar contraseña</h6>
        </v-card-item>
        <v-card-item class="px-6 border-t">
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle-1 text-center">
                Ingrese su correo electrónico
              </div>
              <div class="text-caption text-center">
                Recibir un correo con su nueva contraseña.
              </div>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Correo electrónico"
                v-model.trim="form.email"
                autocomplete="off"
                :rules="[required, email]"
              />
            </v-col>

            <v-col cols="12">
              <v-btn
                block
                color="primary"
                type="submit"
                variant="outlined"
                :loading="loading"
              >
                Recuperar contraseña
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item class="text-center border-t text-subtitle-2">
          Ya tienes una cuenta?
          <router-link to="/login" class="link"> Inicia sesión </router-link>
        </v-card-item>
      </v-card>
    </v-form>
    <div class="w-100 text-caption py-3 text-grey-darken-2 text-center">
      © {{ new Date().getFullYear() }} Instituto de Informática - UNAP. v1.0
    </div>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { _resetPassword } from "@/app/modules/Auth/services";
import { useRouter } from "vue-router";
import type { RegisterRequestDTO } from "../types";
import { email, required } from "@/core/utils/rules.utils";

const router = useRouter();

const loading = ref<boolean>(false);
const formRef = ref<HTMLFormElement | null>(null);
const form = ref<RegisterRequestDTO>({
  email: "",
});

const submit = async () => {
  const { valid } = await formRef.value!.validate();
  if (!valid) return;
  loading.value = true;
  const response = await _resetPassword(form.value);
  if (response) {
    router.push({ name: "Login" });
  }
  loading.value = false;
};
</script>

<style>
.link {
  color: #3f51b5;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
