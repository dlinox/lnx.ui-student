<template>
  <div class="sticky top-0 z-10 bg-white">
    <v-row :no-gutters="true">
      <v-col cols="12">
        <v-card
          title="Cursos disponibles"
          subtitle="Cursos habilitados para matrícula"
          class="card-course-available"
        >
          <v-card-item class="border-t">
            <v-card
              elevation="0"
              v-for="(item, index) in courseItems"
              :key="item.id"
              :class="index == 0 ? '' : 'border-dashed border-t'"
            >
              <template v-slot:append> </template>

              <v-card-subtitle>
                <small class="text-caption text-primary">
                  {{ item.module }}
                </small>
              </v-card-subtitle>
              <v-card-title class="pt-0">
                <small>
                  <strong> {{ item.code }} - </strong>
                  {{ item.name }}
                </small>
              </v-card-title>

              <v-card-subtitle>
                <small class="text-caption">
                  {{ item.description }}
                </small>
              </v-card-subtitle>

              <v-card-subtitle>
                <small>
                  {{ item.credits }} Créditos | {{ item.hoursPractice }} Hr.
                  Prácticas | {{ item.hoursTheory }} Hr. Teóricas
                </small>
              </v-card-subtitle>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  variant="tonal"
                  link
                  :to="{ name: 'Course', params: { id: item.moduleId } }"
                >
                  Ver Módulo
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
// import { useRouter } from "vue-router";
import { _getEnabledCourses } from "@/app/modules/Course/services";

// import EnrollmentGroup from "../../Enrollment/components/EnrollmentGroup/EnrollmentGroup.vue";

// const router = useRouter();
const courseItems = ref<any[]>([]);
const initComponent = async () => {
  courseItems.value = await _getEnabledCourses(200);
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
