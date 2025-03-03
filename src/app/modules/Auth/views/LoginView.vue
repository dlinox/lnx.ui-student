<template>
  <v-container fluid class="h-100">
    <v-form @submit.prevent="submit" class="h-100">
      <v-row class="h-100">
        <v-col cols="12" sm="8" md="5" lg="4">
          <v-card class="card-login" elevation="0">
            <v-card-item> </v-card-item>
            <v-card-item>
              <v-row>
                <v-col cols="12">
                  <h1>
                    <small> Iniciar sesión </small>
                  </h1>

                  <p>Ingrese sus datos para iniciar sesión</p>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Usuario"
                    v-model="from.username"
                    autocomplete="username"
                  />
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Contraseña"
                    type="password"
                    v-model="from.password"
                    autocomplete="current-password"
                  />

                  <!-- <div class="text-end mt-3">
                    <router-link to="/recuperar-contrasena">
                      ¿Olvidaste tu contraseña?
                    </router-link>
                  </div> -->
                </v-col>
                <v-col cols="12">
                  <v-btn block color="primary" type="submit" :loading="loading">
                    Iniciar sesión
                    <template v-slot:append>
                      <lnx-icon iconName="login-1" />
                    </template>
                  </v-btn>
                </v-col>
                <v-col cols="12" class="text-end">
                  ¿No tienes cuenta?
                  <router-link to="/registro">Registrarse</router-link>
                </v-col>
              </v-row>
            </v-card-item>
            <v-card-item class="text-center">
              <small> v0.1 </small>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import LnxIcon from "@/core/ui/components/icons/LnxIcon.vue";
import { _signIn } from "@/app/modules/Auth/services";
const from = ref({
  username: "",
  password: "",
});

const loading = ref<boolean>(false);
const submit = async () => {
  loading.value = true;
  await _signIn(from.value);
  loading.value = false;
};
</script>

<style>
.card-login {
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  height: 100%;
  padding: 0 2rem !important;
}
</style>
