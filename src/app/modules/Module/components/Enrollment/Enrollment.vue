<template>
  <v-dialog max-width="600" v-model="dialog" activator="parent" scrollable>
    <v-form ref="formRef" @submit.prevent="submit">
      <v-card :title="module?.name" subtitle="Registrar pago">
        <v-alert
          color="gray"
          class="rounded-0 text-caption"
          variant="tonal"
          text="Recuerda que los pagos se actualizan al día siguiente. Si realizas tu pago hoy, será registrado mañana. Para evitar inconvenientes, te recomendamos pagar con anticipación."
          elevation="0"
        >
          <template #prepend>
            <LnxIcon iconName="info-circle" />
          </template>
        </v-alert>
        <v-card-item class="border-t border-b">
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="form.courseId"
                :items="courseItems"
                label="Cursos"
                placeholder="Selecciona un curso"
                :rules="ruleForm.courseId"
                @update:model-value="onCourseChange"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-item-group mandatory class="border-t">
                <v-container
                  style="height: auto; max-height: 180px; overflow-y: auto"
                >
                  <v-alert
                    v-if="groupItems.length === 0"
                    type="warning"
                    variant="tonal"
                  >
                    No hay grupos habilitados para este curso.
                  </v-alert>
                  <v-row dense>
                    <v-col
                      v-for="(item, index) in groupItems"
                      :key="index"
                      cols="12"
                    >
                      <v-item v-slot="{ isSelected, toggle }">
                        <v-card
                          :color="isSelected ? 'primary' : ''"
                          :variant="isSelected ? 'tonal' : 'plain'"
                          @click="
                            if (toggle) toggle();
                            form.groupId = item.id;
                            form.paymentAmount =
                              Number(props.module.prices) + Number(item.price);
                          "
                          class="border"
                        >
                          <v-scroll-y-transition>
                            <v-card-item>
                              <div class="d-flex justify-end">
                                <v-chip
                                  variant="flat"
                                  v-tooltip:top="
                                    'Estudiantes inscritos / Mínimo de estudiantes'
                                  "
                                  :color="
                                    (item.enrolledStudents / item.minStudents) *
                                      100 >=
                                    100
                                      ? 'green-accent-3'
                                      : (item.enrolledStudents /
                                          item.minStudents) *
                                          100 >=
                                        80
                                      ? 'amber-lighten-2'
                                      : 'red-accent-3'
                                  "
                                >
                                  {{
                                    `${item.enrolledStudents} / ${item.minStudents}`
                                  }}
                                </v-chip>
                              </div>

                              <v-chip
                                density="compact"
                                color="info"
                                rounded="sm"
                              >
                                {{ item.modality }}
                              </v-chip>
                              {{ item.group }} -
                              <strong> S/. {{ item.price }} </strong>

                              <br />
                              <!-- <small
                                >Docente:
                                <strong> {{ item.teacher }} </strong></small
                              >
                              <br />
                              <small>
                                Laboratorio:
                                <strong> {{ item.laboratory }} </strong>
                              </small>
                              <br /> -->
                              <small>
                                <v-chip
                                  rounded="sm"
                                  class="rounded-0 me-1"
                                  density="compact"
                                  color="primary"
                                  v-if="item.schedules"
                                >
                                  <strong>
                                    {{ item.schedules?.days }} -
                                    {{ item.schedules?.startHour }} a
                                    {{ item.schedules?.endHour }}
                                  </strong>
                                </v-chip>
                                <v-chip
                                  rounded="sm"
                                  class="rounded-0 me-1"
                                  density="compact"
                                  color="primary"
                                  v-else
                                >
                                  No hay horarios disponibles
                                </v-chip>
                              </small>
                            </v-card-item>
                          </v-scroll-y-transition>
                        </v-card>
                      </v-item>
                    </v-col>
                  </v-row>
                </v-container>
              </v-item-group>
            </v-col>

            <v-col cols="6">
              <v-select
                v-model="form.paymentMethod"
                :items="[
                  { title: 'BN - VENTANILLA', value: 7 },
                  { title: 'BN - PAGALO.PE', value: 9 },
                ]"
                label="Pago realizado en"
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
import { _getByModuleForSelect } from "@/app/modules/Course/services";
import { _enabledGroupsEnrollment } from "@/app/modules/Enrollment/services";

const emit = defineEmits(["success"]);
const props = defineProps<{
  studentId?: number;
  module: any;
}>();

const formRef = ref<HTMLFormElement | null>(null);
const dialog = ref(false);
const loadingForm = ref(false);
const ruleForm = ref(validationRules);
const courseItems = ref<any[]>([]);
const groupItems = ref<any[]>([]);

const form = ref<ModuleEnrollmentFormDTO>(
  Object.assign({}, initialEnrollmentFormState())
);

const onCourseChange = async () => {
  groupItems.value = await _enabledGroupsEnrollment({
    courseId: form.value.courseId,
  });
  form.value.groupId = null;
};

const submit = async () => {
  const { valid } = await formRef.value?.validate();
  if (!valid) return;
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
  form.value.paymentAmount = Number(props.module.prices);
  form.value.curriculumId = props.module.curriculumId;

  courseItems.value = await _getByModuleForSelect(props.module.id);
};

watch(
  () => dialog.value,
  (value) => {
    if (value) initForm();
  }
);
</script>
