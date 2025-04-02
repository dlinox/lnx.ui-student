<template>
  <div class="sticky top-0 z-10 bg-white">
    <v-row :no-gutters="true">
      <v-col cols="12">
        <v-card
          title="Cursos disponibles"
          subtitle="Cursos habilitados para matricula"
          class="card-course-available"
          
        >
          <template v-slot:append>
            <v-btn
            link
            >
            <!-- @click="router.push({ name: 'CourseExtracurricularList' })" -->
              Ver todos
            </v-btn>
          </template>
          <v-card-item class="border-t">
            <v-card
              elevation="0"
              v-for="item in 5"
              :key="item"
              :class="item == 1 ? '' : 'border-dashed border-t'"
            >
              <template v-slot:append> </template>
              <v-card-title class="pt-0">
                <small>
                  <strong> AAA34 </strong>
                  Desarrollo de aplicaciones web
                </small>
              </v-card-title>

              <v-card-subtitle>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor
                suscipit voluptates dolore provident enim laboriosam, saepe sint
                facilis dignissimos, qui, ex deserunt doloribus. Officia quo
                iure fugit, consectetur illum ea.
              </v-card-subtitle>

              <v-card-subtitle>
                <small>
                  10 Creditos | 50 Hr. Practicas | 50 Hr. Teoricas
                </small>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="outlined">
                  Ver Grupos
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { _getExtracurricularCourses } from "@/app/modules/Course/services";
// import EnrollmentGroup from "../../Enrollment/components/EnrollmentGroup/EnrollmentGroup.vue";

const courseItems = ref<any[]>([]);
const initComponent = async () => {
  courseItems.value = await _getExtracurricularCourses(2);
};

initComponent();
</script>

<style>
.card-course-available {
  position: static;
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
}
</style>
