<template>
  <v-dialog max-width="600" v-model="dialog" activator="parent">
    <v-form ref="formRef" @submit.prevent="submit">
      <v-card :title="course?.name" subtitle="Registrar pago">
        <v-item-group mandatory class="border-t">
          <v-container
            style="height: auto; max-height: 280px; overflow-y: auto"
          >
            <v-alert
              v-if="groupItems.length === 0"
              type="warning"
              variant="tonal"
            >
              No hay grupos habilitados para este curso.
            </v-alert>
            <v-row dense>
              <v-col v-for="(item, index) in groupItems" :key="index" cols="12">
                <v-item v-slot="{ isSelected, toggle }">
                  <v-card
                    :color="isSelected ? 'primary' : ''"
                    :variant="isSelected ? 'tonal' : 'plain'"
                    @click="
                      if (toggle) toggle();
                      form.groupId = item.id;
                      form.paymentAmount = item.price;
                    "
                    class="border"
                  >
                    <v-scroll-y-transition>
                      <v-card-item>
                        {{ item.group }} -
                        <strong> S/. {{ item.price }} </strong>
                        <br />
                        <v-chip
                          class="rounded-0"
                          density="compact"
                          color="info"
                          rounded="sm"
                        >
                          {{ item.modality }}
                        </v-chip>
                        <br />
                        <small
                          >Docente: <strong> {{ item.teacher }} </strong></small
                        >
                        <br />
                        <small>
                          Laboratorio:
                          <strong> {{ item.laboratory }} </strong>
                        </small>
                        <br />
                        <small>
                          Horarios:
                          <v-chip
                            rounded="sm"
                            class="rounded-0 me-1"
                            density="compact"
                            color="primary"
                            v-for="schedule in item.schedules"
                          >
                            {{ schedule.day }} {{ schedule.startHour }} -
                            {{ schedule.endHour }}
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
          >
            Cancelar
          </v-btn>
          <v-btn
            text="Inscribirme"
            color="primary"
            type="submit"
            variant="flat"
            value="submit"
            :loading="loadingForm"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import {
  _enabledGroupsEnrollment,
  _storeGroupEnrollment,
} from "@/app/modules/Enrollment/services";

const emit = defineEmits(["success"]);
const props = defineProps<{
  course: any;
}>();

const dialog = ref(false);
const loadingForm = ref(false);
const ruleForm = ref<any>([]);
const form = ref<any>({
  paymentMethod: null,
  paymentSequence: null,
  paymentAmount: null,
  paymentDate: null,
  groupId: null,
});

const groupItems = ref<any[]>([]);
const submit = async () => {
  loadingForm.value = true;
  const response = await _storeGroupEnrollment(form.value);
  if (response) {
    emit("success");
    dialog.value = false;
  }

  loadingForm.value = false;

  console.log(form.value);
};

const initForm = async () => {
  form.value = {
    paymentMethod: null,
    paymentSequence: null,
    paymentAmount: null,
    paymentDate: null,
    groupId: null,
  };

  groupItems.value = await _enabledGroupsEnrollment({
    curriculumCourseId: props.course.curriculumCourseId,
  });
};

watch(
  () => dialog.value,
  (value) => {
    if (value) initForm();
  }
);
</script>
