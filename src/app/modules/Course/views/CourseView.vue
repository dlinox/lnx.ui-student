<template>
  <v-card
    :title="module?.name"
    subtitle="Cursos"
    class="rounded-0"
    elevation="0"
  >
    <template v-slot:append>
      <v-btn variant="text" @click="$router.go(-1)">
        <template v-slot:prepend>
          <LnxIcon iconName="arrow-left-3" size="large" />
        </template>
        Atrás
      </v-btn>
    </template>
  </v-card>

  <v-container>
    <v-row class="">
      <v-col cols="12" md="7" lg="8">
        <v-row>
          <v-col cols="12" v-for="(course, index) in courseItems" :key="index">
            <v-card
              elevation="0"
              class="rounded-5 border"
              :subtitle="course?.area"
            >
              <template v-slot:append>
                <v-btn
                  v-if="module?.isEnrolled == true"
                  density="compact"
                  variant="outlined"
                >
                  <EnrollmentGroup :course="course" @success="initView" />
                  Inscríbete
                </v-btn>
              </template>
              <v-card-title class="pt-0">
                <small>
                  <strong>{{ course.code }} - </strong>
                  {{ course.name }}
                </small>
              </v-card-title>
              <v-card-item>
                <small>
                  Creditos {{ course.credits }} | {{ course.hoursPractice }} Hr.
                  Practicas | {{ course.hoursTheory }} Hr. Teoricas
                </small>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="5" lg="4">
        <v-card elevation="0" class="rounded-5 border">
          <v-card-title>Contenido</v-card-title>
          <v-card-item>
            <v-list two-line>
              <v-list-item>
                <v-list-item-subtitle> Cursos </v-list-item-subtitle>
                <v-list-item-title three-line>
                  {{ module?.coursesCount }}, {{ module?.hoursPractice }} Hr.
                  Practicas, {{ module?.hoursTheory }} Hr. Teoricas
                </v-list-item-title>
              </v-list-item>

              <v-list-item>
                <v-list-item-subtitle>
                  Cantidad de creditos
                </v-list-item-subtitle>
                <v-list-item-title>
                  {{ module?.credits }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle> Area(s) </v-list-item-subtitle>
                <v-list-item-title>
                  {{ module?.areas }}
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-subtitle>
                  Precio de matricula
                </v-list-item-subtitle>
                <v-list-item-title>
                  S/. {{ module?.prices }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-item>
          <v-card-actions v-if="module?.isEnrolled == false">
            <v-btn block class="mt-2">
              Matricular
              <ModuleEnrollment :module="module" @success="initView" />
            </v-btn>
          </v-card-actions>
        </v-card>
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
const route = useRoute();
const module = ref<any>(null);
const courseItems = ref<any[]>([]);
const moduleId = ref<string>("");
const initView = async () => {
  moduleId.value = route.params.id as string;
  module.value = await _getModuleByCurriculum(moduleId.value, 2);
  courseItems.value = await _getCurriculumCourses(module.value.id, 2);
};

onMounted(() => {
  initView();
});
</script>
