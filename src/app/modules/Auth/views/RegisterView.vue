<template>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col cols="12" md="12" lg="7">
        <v-card class="card-regsiter" elevation="0">
          <v-toolbar color="gray">
            <v-toolbar-title>
              Registrarse <br />
              <small class="text-caption text-secondary">
                Verifique sus datos personales, antes de continuar
              </small>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <template v-slot:extension>
              <v-tabs v-model="tab" align-tabs="start">
                <v-tab text="Datos personales" value="Datos personales"></v-tab>
                <v-tab text="Documentos" value="Documentos" disabled />
              </v-tabs>
            </template>
          </v-toolbar>
          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="Datos personales">
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="5" class="d-flex align-center justify-end">
                      Tipo de estudiante
                    </v-col>
                    <v-col cols="7">
                      <v-select
                        density="compact"
                        placeholder="Seleccione un tipo"
                        v-model="form.studentTypeId"
                        :items="studentTypes"
                      />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Documento de identidad
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        density="compact"
                        v-model="form.documentNumber"
                      />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Nombres
                    </v-col>
                    <v-col cols="7">
                      <v-text-field density="compact" v-model="form.name" />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Apellido paterno
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        density="compact"
                        v-model="form.lastNameFather"
                      />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Apellido materno
                    </v-col>

                    <v-col cols="7">
                      <v-text-field
                        density="compact"
                        v-model="form.lastNameMother"
                      />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Fecha de nacimiento
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        density="compact"
                        v-model="form.dateOfBirth"
                        type="date"
                      />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Género
                    </v-col>

                    <v-col cols="7">
                      <v-select
                        density="compact"
                        :items="[
                          { value: 1, title: 'Masculino' },
                          { value: 2, title: 'Femenino' },
                        ]"
                        v-model="form.gender"
                      />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Correo electrónico
                    </v-col>
                    <v-col cols="7">
                      <v-text-field density="compact" v-model="form.email" />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                      Celular / WhatsApp
                    </v-col>
                    <v-col cols="7">
                      <v-text-field density="compact" v-model="form.phone" />
                    </v-col>

                    <v-col cols="5" class="d-flex align-center justify-end">
                    </v-col>
                    <v-col cols="7" class="d-flex align-center justify-end">
                      <v-btn @click="submit" color="primary">
                        Registrarse
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <v-tabs-window-item value="Documentos">
              <v-card flat>
                <v-card-text> </v-card-text>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
          <v-card-item class="text-center">
            <small>
              v0.1
              <!-- © {{ new Date().getFullYear() }} INSTITUTO DE INFORMÁTICA - UNAP -->
            </small>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { __getStudentTypesForSelect } from "@/app/shared/services/selectables.services";
import { _signUp } from "@/app/modules/Auth/services";
import type { ItemSelectable } from "@/core/types/ItemSelectable.types";
import { useRouter } from "vue-router";

const tab = ref<string | null>(null);
const studentTypes = ref<ItemSelectable[]>([]);
const router = useRouter();
const form = ref({
  studentTypeId: null,
  documentTypeId: 1,
  documentNumber: null,
  name: null,
  lastNameFather: null,
  lastNameMother: null,
  gender: null,
  email: null,
  phone: null,
  dateOfBirth: null,
  isEnabled: false,
});

const submit = async () => {
  console.log(form.value);
  const response = await _signUp(form.value);
  if (response) {
    router.push({ name: "Login" });
  }
};

const initView = async () => {
  studentTypes.value = await __getStudentTypesForSelect();
};

initView();
</script>
