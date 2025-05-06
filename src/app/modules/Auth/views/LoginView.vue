<template>
  <v-container
    class="h-min-screen h-100 pa-0 d-flex justify-center align-center flex-column"
  >
    <v-form ref="formRef" @submit.prevent="submit" class="flex-wrap">
      <v-card class="" width="400px">
        <v-card-item class="text-center">
          <img src="/resources/images/logo.png" alt="logo" width="70" />
        </v-card-item>
        <v-card-item class="px-6">
          <v-row>
            <v-col cols="12" class="text-center">
              <span class="text-subtitle-1 ">
                Estudiante
              </span>
              <h6 class="text-h6">Iniciar sesión</h6>
              <span class="text-caption">
                Ingrese sus datos para iniciar sesión
              </span>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Usuario"
                v-model="form.username"
                autocomplete="username"
                :rules="[required]"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Contraseña"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                autocomplete="current-password"
                :rules="[required]"
              >
                <template v-slot:append-inner>
                  <v-btn
                    icon
                    @click="showPassword = !showPassword"
                    size="x-small"
                    rounded="sm"
                    variant="text"
                  >
                    <lnx-icon :iconName="showPassword ? 'eye' : 'eye-slash'" />
                  </v-btn>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" class="text-end text-subtitle-2">
              <router-link to="/recuperar-contrasena" class="link">
                ¿Olvidaste tu contraseña?
              </router-link>
            </v-col>
            <v-col cols="12">
              <v-btn
                block
                color="primary"
                type="submit"
                variant="outlined"
                :loading="loading"
              >
                <template v-slot:append>
                  <lnx-icon iconName="login-1" />
                </template>
                Ingresar
              </v-btn>
            </v-col>
            <v-col cols="12" class="text-end text-subtitle-2">
              ¿Estudiante nuevo?
              <router-link to="/registro" class="link">Registrarse</router-link>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-item class="text-center border-t text-subtitle-2">
          Si ya eres estudiante, crea la tuya
          <router-link to="/crear-cuenta" class="link"> aquí. </router-link>
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
import LnxIcon from "@/core/ui/components/icons/LnxIcon.vue";
import { _signIn } from "@/app/modules/Auth/services";
import type { AuthRequestDTO } from "../types";
import { required } from "@/core/utils/rules.utils";

const showPassword = ref<boolean>(false);
const formRef = ref<HTMLFormElement | null>(null);
const form = ref<AuthRequestDTO>({
  username: "",
  password: "",
});

const loading = ref<boolean>(false);
const submit = async () => {
  const { valid } = await formRef.value!.validate();
  if (!valid) return;
  loading.value = true;
  await _signIn(form.value);
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
