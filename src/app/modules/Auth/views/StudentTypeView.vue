<template>
  <v-container
    class="h-min-screen h-100 pa-0 d-flex justify-center align-center flex-column"
  >
    <v-form ref="formRef" @submit.prevent="submit" class="h-full">
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
                Por favor seleccione su tipo de estudiante
              </div>
              <div class="text-caption text-center">
                Seleccione el tipo de estudiante.
              </div>
            </v-col>
            <v-col cols="12">
              <v-item-group v-model="form.type" mandatory>
                <v-item value="1" v-slot="{ isSelected, toggle }">
                  <v-list-item
                    :class="[
                      'py-2 mb-2 ',
                      isSelected ? 'text-blue-darken-2' : 'border',
                    ]"
                    rounded
                    :variant="isSelected ? 'outlined' : 'plain'"
                    @click="toggle"
                    title="Estudiante UNAP"
                    subtitle="Estudiante o egresado de la Universidad Nacional del Altiplano Puno"
                  >
                    <template v-slot:prepend>
                      <input type="radio" v-model="form.type" value="1" />
                    </template>
                  </v-list-item>
                </v-item>
                <v-item value="2" v-slot="{ isSelected, toggle }">
                  <v-list-item
                    :class="[
                      'py-2 mb-2 ',
                      isSelected ? 'text-blue-darken-2' : 'border',
                    ]"
                    rounded
                    :variant="isSelected ? 'outlined' : 'plain'"
                    @click="toggle"
                    title="Estudiante Particular"
                    subtitle="Persona que no pertenece a la Universidad Nacional del Altiplano Puno"
                  >
                    <template v-slot:prepend>
                      <input type="radio" v-model="form.type" value="2" />
                    </template>
                  </v-list-item>
                </v-item>
              </v-item-group>
            </v-col>
            <v-col cols="12" v-if="form.type === '1'">
              <v-text-field
                label="Código de estudiante"
                v-model="form.code"
                :rules="[required]"
                autocomplete="off"
              />
            </v-col>

            <v-col cols="12">
              <template v-if="form.type === '2'">
                <v-btn
                  block
                  color="primary"
                  type="submit"
                  variant="outlined"
                  :loading="loading"
                >
                  Continuar
                </v-btn>
              </template>
              <template v-else>
                <v-btn
                  block
                  color="primary"
                  type="submit"
                  variant="outlined"
                  :loading="loading"
                >
                  Verificar y Continuar
                </v-btn>
              </template>
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
import { _studentType } from "@/app/modules/Auth/services";
import { useRouter, useRoute } from "vue-router";
import { required } from "@/core/utils/rules.utils";

const router = useRouter();
const route = useRoute();

const formRef = ref<HTMLFormElement | null>(null);
const form = ref<any>({
  payload: null,
  code: null,
  type: "1",
});

const loading = ref<boolean>(false);

const submit = async () => {
  const { valid } = await formRef.value!.validate();
  if (!valid) return;
  const payload = route.params.payload;
  if (form.value.type == "2") form.value.code = null;
  form.value.payload = payload;
  loading.value = true;
  const response = await _studentType(form.value);
  if (response) {
    router.push({ name: "PersonalData", params: { payload: payload } });
  }
  loading.value = false;
};
</script>
