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
        </v-card-item>
        <v-card-item class="px-6 border-t">
          <v-row>
            <v-col cols="12">
              <div class="text-subtitle-1">Datos personales</div>
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
                v-model.trim="form.documentNumber"
                :rules="[required]"
              />
            </v-col>

            <v-col cols="12">
              <v-text-field
                label="Nombres"
                v-model.trim="form.name"
                :rules="[required]"
                v-upper-case
              />
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                label="Apellido paterno"
                v-model.trim="form.lastNameFather"
                v-upper-case
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Apellido materno"
                v-model.trim="form.lastNameMother"
                v-upper-case
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                label="Género"
                v-model.trim="form.gender"
                :items="genderItems"
                :rules="[required]"
                v-upper-case
              />
            </v-col>

            <v-col cols="12" md="6">
              <v-text-field
                label="Fecha de nacimiento"
                v-model="form.fechaNacimiento"
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

        <!-- <v-card-item class="px-6 border-t">
            <v-row>
              <v-col cols="12">
                <div class="text-subtitle-1">Datos de acceso</div>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field
                  label="Usuario"
                  v-model="form.username"
                  :rules="[required]"
                  autocomplete="off"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Contraseña"
                  :type="showPassword ? 'text' : 'password'"
                  v-model="form.password"
                  autocomplete="off"
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
            </v-row>
          </v-card-item> -->
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
import {
  _finishRegister,
  _getDataStudentByType,
} from "@/app/modules/Auth/services";
import { __getDocumentTypesForSelect } from "@/app/shared/services/selectables.services";
import { required } from "@/core/utils/rules.utils";
import { useRoute } from "vue-router";

// const router = useRouter();
const route = useRoute();

const documentTypes = ref<any[]>([]);

const genderItems = [
  {
    title: "Masculino",
    value: "1",
  },
  {
    title: "Femenino",
    value: "2",
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
  fechaNacimiento: "",
  phone: "",
});

const loading = ref<boolean>(false);

const getDataStudent = async () => {
  const id = route.params.payload as string;
  const data = await _getDataStudentByType(id);
  if (!data) return;
  form.value = {
    ...data,
    documentTypeId: 1,
    documentNumber: data.document,
  };
};

const submit = async () => {
  const { valid } = await formRef.value!.validate();
  if (!valid) return;

  const payload = route.params.payload;
  form.value.payload = payload;
  loading.value = true;
  await _finishRegister(form.value);
  loading.value = false;
};

const initView = async () => {
  await getDataStudent();
  documentTypes.value = await __getDocumentTypesForSelect();
};

initView();
</script>
