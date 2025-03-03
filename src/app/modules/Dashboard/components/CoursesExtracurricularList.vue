<template>
  <div>
    <v-row :no-gutters="true">
      <v-col cols="12">
        <v-card
          title="Cursos extracurriculares"
          subtitle="Cursos extracurriculares disponibles"
          class="rounded-0 border"
        />
      </v-col>
      <v-col cols="12" >
        <div class="wrapper-list-courses-extracurricular">
          <v-card
            elevation="0"
            class="rounded-0 border"
            v-for="(course, index) in courseItems" :key="index"
            :subtitle="course?.area"
          >
            <template v-slot:append>
              <v-chip
                color="primary"
                class="rounded-0"
                v-if="course.hasEnrollmentGroup"
              >
                Inscrito
              </v-chip>
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
            <v-card-actions v-if="!course.hasEnrollmentGroup">
              <v-spacer></v-spacer>
              <v-btn density="compact" variant="outlined" rounded="0">
                <EnrollmentGroup :course="course" @success="" />
                Inscríbete
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { _getExtracurricularCourses } from "@/app/modules/Course/services";
import EnrollmentGroup from "../../Enrollment/components/EnrollmentGroup/EnrollmentGroup.vue";

const courseItems = ref<any[]>([]);
const initComponent = async () => {
  courseItems.value = await _getExtracurricularCourses(2);
};

initComponent();
</script>

<style>
.wrapper-list-courses-extracurricular {
  position: static;
  width: 100%;
  max-height: 600px;
  overflow-y: auto;
}
</style>
