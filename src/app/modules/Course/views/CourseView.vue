<template>
  <v-container>
    <v-row class="">
      <v-col cols="12" md="5" lg="4">
        <v-card elevation="1">
          <v-card-title> </v-card-title>
          <v-list two-line>
            <v-list-item>
              <v-list-item-subtitle> Cursos </v-list-item-subtitle>
              <v-list-item-title three-line class="text-subtitle-2">
                {{ module?.coursesCount }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle> Area(s) </v-list-item-subtitle>
              <v-list-item-title class="text-subtitle-2">
                {{ module?.areas }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle> Precio de matrícula </v-list-item-subtitle>
              <v-list-item-title class="text-subtitle-2">
                S/. {{ module?.prices }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-btn
            v-if="module?.isEnrolled"
            variant="tonal"
            block
            color="success"
          >
            <template #prepend>
              <LnxIcon iconName="verify" />
            </template>
            Matriculado
          </v-btn>
          <v-card-actions v-if="module?.isEnrolled == false">
            <v-btn block class="mt-2" v-if="module?.prices !== null">
              Matricular
              <ModuleEnrollment :module="module" @success="initView" />
            </v-btn>
            <v-alert v-else variant="tonal" color="error">
              No se puede matricular, no hay precios establecidos.
            </v-alert>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="7" lg="8">
        <v-row>
          <v-col cols="12" v-for="(course, index) in courseItems" :key="index">
            <v-card elevation="1">
              <v-card-subtitle class="mt-3">
                <small>
                  {{ course?.area }}
                </small>
              </v-card-subtitle>
              <v-card-title class="pt-0 mt-0">
                <small>
                  <strong>{{ course.code }} - </strong>
                  {{ course.name }}
                </small>
              </v-card-title>
              <v-card-item v-if="course.description" class="text-caption">
                {{ course.description }}
              </v-card-item>

              <v-card-item
                class="border-t"
                v-if="course.hasEnrollment"
                v-for="(enrollment, j) in course.enrollment"
                :key="j"
              >
                <v-row>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-subtitle>Periodo</v-list-item-subtitle>
                      <v-list-item-title class="text-caption">
                        <v-chip
                          class="text-caption"
                          density="compact"
                          color="blue"
                          v-if="
                            enrollment.periodId ==
                            periodStore?.enrolled?.periodId
                          "
                        >
                          {{ enrollment.period }}
                        </v-chip>
                        <span v-else>
                          {{ enrollment.period }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-subtitle>Gupo</v-list-item-subtitle>
                      <v-list-item-title class="text-caption">
                        {{ enrollment.group }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-subtitle>Docente</v-list-item-subtitle>
                      <v-list-item-title class="text-caption">
                        {{ enrollment.teacher || "-" }}
                      </v-list-item-title>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-subtitle>Nota</v-list-item-subtitle>
                      <v-list-item-title
                        class="text-caption"
                        :class="
                          enrollment.grade >= 10 ? 'text-success' : 'text-error'
                        "
                      >
                        {{ enrollment.grade || "-" }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-list-item>
                      <v-list-item-subtitle>Modalidad</v-list-item-subtitle>
                      <v-list-item-title class="text-caption">
                        {{ enrollment.modality }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-subtitle>Laboratorio</v-list-item-subtitle>
                      <v-list-item-title class="text-caption">
                        <a
                          v-if="enrollment.modality == 'VIRTUAL'"
                          :href="enrollment.virtualLink"
                          target="_blank"
                          class="text-primary"
                        >
                          <v-icon>
                            <LnxIcon iconName="link-1" />
                          </v-icon>
                          {{ enrollment.laboratory }}
                        </a>
                        <span v-else>
                          {{ enrollment.laboratory }}
                        </span>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-subtitle>Horario</v-list-item-subtitle>
                      <v-list-item-title class="text-caption">
                        {{ enrollment.schedule }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-col>
                </v-row>
                <v-list-item
                  v-if="enrollment.periodId == periodStore?.enrolled?.periodId"
                  variant="tonal"
                  class="rounded-lg mt-3"
                >
                  <v-list-item-title class="text-subtitle-2">
                    Matriculados
                  </v-list-item-title>
                  <template #append>
                    {{ enrollment.countStudents }} /
                    {{ enrollment.minStudents }}
                  </template>
                  <v-progress-linear
                    :max="enrollment.minStudents"
                    :model-value="enrollment.countStudents"
                    color="dark"
                    height="12"
                    rounded
                  />
                  <v-list-item-subtitle>
                    <small>
                      Mínimo requerido: {{ enrollment.minStudents }}
                    </small>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-card-item>
              <v-card-actions
                v-if="
                  !course.isApproved &&
                  periodStore?.enrolled &&
                  course.lastEnrollment != periodStore?.enrolled?.periodId
                "
                class="bg-grey-lighten-4"
              >
                <v-spacer></v-spacer>

                <!-- <v-btn
                  icon
                  class="rounded-lg"
                  density="comfortable"
                  variant="text"
                  color="red"
                  v-tooltip:top="'Añaadir a deseados'"
                >
                  <LnxIcon iconName="heart" />
                </v-btn> -->
                <v-btn v-if="module?.isEnrolled" variant="outlined">
                  <EnrollmentGroup :course="course" @success="initView" />
                  Inscríbete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { _getModuleByCurriculum } from "@/app/modules/Module/services";
import { _getCurriculumCourses } from "@/app/modules/Course/services";
import ModuleEnrollment from "@/app/modules/Module/components/Enrollment/Enrollment.vue";
import EnrollmentGroup from "../../Enrollment/components/EnrollmentGroup/EnrollmentGroup.vue";
import { useHeadingStore } from "@/app/store/heading.store";
import { usePeriodStore } from "@/app/store/period.stores";

const periodStore = usePeriodStore();
const headingStore = useHeadingStore();
const route = useRoute();
const module = ref<any>(null);
const courseItems = ref<any[]>([]);
const moduleId = ref<string>("");
const initView = async () => {
  moduleId.value = route.params.id as string;
  module.value = await _getModuleByCurriculum(moduleId.value, 2);
  courseItems.value = await _getCurriculumCourses(module.value.id, 2);
  headingStore.setHeading(module.value.name, "Cursos disponibles del módulo");
};

onMounted(() => {
  initView();
});
</script>
