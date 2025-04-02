<template>
  <v-container
    class="h-min-screen h-100 pa-0 d-flex justify-center align-center flex-column"
  >
    <v-form ref="formRef" @submit.prevent="submit" class="h-full">
      <v-card class="" width="600px">
        <v-card-item class="text-center">
          <img src="/resources/images/logo.png" alt="logo" width="70" />
          <h6 class="text-h6 pt-3 text-primary">
            Registro de nuevo estudiante
          </h6>
          <div></div>
        </v-card-item>
        <v-card-item class="px-6 border-t">
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle-1 text-center">
                Verifique sus datos personales
              </div>
              <div class="text-caption text-center">
                Por favor, verifique sus datos personales, si es necesario puede
                modificarlos.
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                label="Tipo de documento"
                v-model="form.documentTypeId"
                :items="documentTypes"
                :rules="[required]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Número de documento"
                v-model="form.documentNumber"
                :rules="[required]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Nombres"
                v-model="form.name"
                :rules="[required]"
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Apellido paterno"
                v-model="form.lastNameFather"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Apellido materno"
                v-model="form.lastNameMother"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                label="Género"
                v-model="form.gender"
                :items="genderItems"
                :rules="[required]"
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Fecha de nacimiento"
                v-model="form.dateOfBirth"
                type="date"
                :rules="[required]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Número de celular"
                v-model="form.phone"
                :rules="[required]"
              />
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-actions>
          <v-btn
            block
            color="primary"
            type="submit"
            :loading="loading"
            variant="outlined"
          >
            Finalizar
          </v-btn>
        </v-card-actions>
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
import { _saveAccount, _getDataStudent } from "@/app/modules/Auth/services";
import { __getDocumentTypesForSelect } from "@/app/shared/services/selectables.services";
import { required } from "@/core/utils/rules.utils";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const documentTypes = ref<any[]>([]);

const genderItems = [
  {
    title: "Masculino",
    value: 1,
  },
  {
    title: "Femenino",
    value: 2,
  },
];

const formRef = ref<HTMLFormElement | null>(null);

const form = ref<any>({
  payload: null,
  documentTypeId: 1,
  documentNumber: "",
  name: "",
  lastNameFather: "",
  lastNameMother: "",
  gender: null,
  dateOfBirth: "",
  phone: "",
});

const loading = ref<boolean>(false);

const getDataStudent = async () => {
  const payload = route.params.payload;
  const response = await _getDataStudent(payload as string);
  if (response) {
    form.value = response;
  } else {
    router.push({ name: "Login" });
  }
};

const submit = async () => {
  const { valid } = await formRef.value!.validate();
  if (!valid) return;

  const payload = route.params.payload;
  form.value.payload = payload;
  loading.value = true;
  await _saveAccount(form.value);
  loading.value = false;
};

const initView = async () => {
  documentTypes.value = await __getDocumentTypesForSelect();
  await getDataStudent();
};

initView();
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
