<template>
  <v-dialog max-width="600" v-model="dialog" activator="parent">
    <v-form ref="formRef" @submit.prevent="submit">
      <v-card :title="module?.name" subtitle="Registrar pago">
        <v-card
          color="info"
          variant="tonal"
          subtitle="El pago debe ser realizado con un dia de anticipación."
          elevation="0"
          class="rounded-0"
        >
          <template #prepend>
            <LnxIcon iconName="info-circle" />
          </template>
        </v-card>
        <v-card-item class="border-t border-b">
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="form.paymentMethod"
                :items="[
                  { title: 'BN - VENTANILLA', value: 7 },
                  { title: 'BN - PAGALO.PE', value: 9 },
                ]"
                label="Pago en"
                :rules="ruleForm.paymentMethod"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="form.paymentSequence"
                label="Numero de operacion"
                type="number"
                :rules="ruleForm.paymentSequence"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="form.paymentAmount"
                readonly
                label="Monto"
                type="number"
                :rules="ruleForm.paymentAmount"
              ></v-text-field>
            </v-col>

            <v-col cols="6">
              <v-text-field
                v-model="form.paymentDate"
                label="Fecha"
                type="date"
                :rules="ruleForm.paymentDate"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-item>
        <v-card-actions>
          <v-btn
            type="button"
            variant="tonal"
            color="secondary"
            @click="dialog = false"
            >Cancelar</v-btn
          >
          <v-btn
            text="Matricular"
            color="primary"
            type="submit"
            :loading="loadingForm"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import type { ModuleEnrollmentFormDTO } from "../../types";
import { initialEnrollmentFormState, validationRules } from "./constants";
import { _storeStudentEnrollment } from "@/app/modules/Enrollment/services";

const emit = defineEmits(["success"]);
const props = defineProps<{
  studentId?: number;
  module: any;
}>();

const dialog = ref(false);
const loadingForm = ref(false);
const ruleForm = ref(validationRules);
const form = ref<ModuleEnrollmentFormDTO>(
  Object.assign({}, initialEnrollmentFormState())
);

const submit = async () => {
  loadingForm.value = true;
  const enrollment = await _storeStudentEnrollment(form.value);
  if (enrollment) {
    emit("success");
    dialog.value = false;
  }
  loadingForm.value = false;
};

const initForm = async () => {
  form.value = Object.assign({}, initialEnrollmentFormState());
  ruleForm.value = validationRules;
  form.value.moduleId = props.module.id;
  form.value.paymentAmount = props.module.prices;
  form.value.curriculumId = props.module.curriculumId;
};

watch(
  () => dialog.value,
  (value) => {
    if (value) initForm();
  }
);
</script>
