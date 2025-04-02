<template>
  <v-container
    class="h-min-screen h-100 pa-0 d-flex justify-center align-center flex-column"
  >
    <v-form @submit.prevent="submit" class="h-full">
      <v-card class="" width="400px">
        <v-card-item class="text-center">
          <img src="/resources/images/logo.png" alt="logo" width="70" />
          <h6 class="text-h6 pt-3 text-primary">
            Registro de nuevo estudiante
          </h6>
        </v-card-item>
        <v-card-item class="px-6 border-t">
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle-1 text-center">
                Verificación de correo electrónico
              </div>
              <div class="text-caption text-center">
                Ingrese el codigo de verificación que se envió a su correo
                electrónico.
              </div>
            </v-col>
            <v-col cols="12">
              <v-otp-input
                v-model="code"
                :disabled="loading"
                length="6"
                variant="filled"
                class="rounded-sm"
                @finish="submit"
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
                Verificar
              </v-btn>
            </v-col>
            <v-col cols="12" class="text-center">
              <div class="text-caption w-full">¿No recibiste el código?</div>
              <v-btn
                variant="text"
                color="dark"
                type="button"
                density="compact"
                :loading="loadingReSend"
                @click="reSendCode"
              >
                Reenviar código
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
import { _verifyCode, _reSendCode } from "@/app/modules/Auth/services";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const code = ref<string>("");

const loading = ref<boolean>(false);
const loadingReSend = ref<boolean>(false);
const reSendCode = async () => {
  const id = route.params.t;
  loadingReSend.value = true;
  await _reSendCode({ payload: id });
  loadingReSend.value = false;
};

const submit = async () => {
  const id = route.params.payload;
  loading.value = true;
  const response = await _verifyCode({
    code: code.value,
    payload: id,
  });

  if (response) {
    router.push({ name: "StudentType", params: { payload: id } });
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
