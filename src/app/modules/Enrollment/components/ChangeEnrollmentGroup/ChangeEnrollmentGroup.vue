<template>
  <v-dialog max-width="600" v-model="dialog" activator="parent">
    <v-form ref="formRef" @submit.prevent="submit">
      <v-card title="Cambiar grupo" subtitle="Selecciona un grupo">
        <v-item-group mandatory class="border-t">
          <v-container style="height: auto; max-height: 280px; overflow-y: auto">
            <v-alert v-if="groupItems.length === 0" type="warning" variant="outlined">
              No otros grupos habilitados para este curso.
            </v-alert>
            <v-row dense>
              <v-col v-for="(item, index) in groupItems" :key="index" cols="12">
                <v-item v-slot="{ isSelected, toggle }">
                  <v-card :color="isSelected ? 'primary' : ''" :variant="isSelected ? 'tonal' : 'plain'"
                    @click="if (toggle) toggle(); form.groupId = item.id;" class="border">
                    <v-scroll-y-transition>

                      <v-card-item>
                        <div class="d-flex justify-end">
                          <v-chip class="rounded-0" variant="flat"
                            v-tooltip:top="'Estudiantes inscritos / Mínimo de estudiantes'"
                            :color="item.enrolledStudents / item.minStudents * 100 >= 100 ? 'green-accent-3' : (item.enrolledStudents / item.minStudents * 100 >= 80 ? 'amber-lighten-2' : 'red-accent-3')">
                            {{ `${item.enrolledStudents} / ${item.minStudents}` }}
                          </v-chip>
                        </div>

                        {{ item.group }} -
                        <strong> S/. {{ item.price }} </strong>
                        <br />
                        <v-chip class="rounded-0" density="compact" color="info" rounded="sm">
                          {{ item.modality }}
                        </v-chip>
                        <br />
                        <small>
                          Docente: <strong> {{ item.teacher }} </strong>
                        </small>
                        <br />
                        <small>
                          Laboratorio:
                          <strong> {{ item.laboratory }} </strong>
                        </small>
                        <br />
                        <small>
                          Horarios:
                          <v-chip v-if="item.schedules" rounded="sm" class="rounded-0 me-1" density="compact" color="primary">
                            {{ item.schedules.days }}
                            {{ item.schedules.startHour }} -
                            {{ item.schedules.endHour }}
                          </v-chip>
                          <v-chip v-else rounded="sm" class="rounded-0 me-1" density="compact" color="primary">
                            No hay horarios
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

        <v-card-actions>
          <v-btn type="button" variant="tonal" color="secondary" @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn text="Cambiar grupo" color="primary" type="submit" variant="flat" value="submit"
            :loading="loadingForm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import {
  _enabledGroupsEnrollment,
  _updateGroupEnrollment,
} from "@/app/modules/Enrollment/services";

const emit = defineEmits(["success"]);
const props = defineProps<{
  group: any;
}>();

const formRef = ref<any>(null);
const form = ref<any>({
  groupId: null,
});
const dialog = ref(false);
const loadingForm = ref(false);
const groupItems = ref<any[]>([]);


const submit = async () => {
  if (!form.value.groupId) {
    return;
  }

  loadingForm.value = true;

  await _updateGroupEnrollment({
    groupId: form.value.groupId,
    id: props.group.id,
  });
  emit("success");
  dialog.value = false;
  loadingForm.value = false;
};

const initForm = async () => {
  form.value = {
    groupId: null,
  };

  groupItems.value = await _enabledGroupsEnrollment({
    groupId: props.group.groupId,
  });
};

watch(
  () => dialog.value,
  (value) => {
    if (value) initForm();
  }
);
</script>
