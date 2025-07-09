<template>
  <v-card
    :title="`Grupos ${period}`"
    subtitle="Grupos habilitados para matrícula"
  >
    <v-data-iterator :items="groups" :items-per-page="3" :search="search">
      <template v-slot:header>
        <v-card-item>
          <v-text-field
            label="Buscar grupo"
            v-model="search"
            placeholder="Buscar grupo"
            clearable
            hide-details
          ></v-text-field>
        </v-card-item>
      </template>

      <template v-slot:default="{ items }">
        <v-card
          class="border-t rounded-0"
          elevation="0"
          v-for="(enrollment, j) in items"
          :key="j"
        >
          <v-card-subtitle class="text-subtitle-2 mt-4">
            {{ enrollment.raw.moduleName }}
          </v-card-subtitle>
          <v-card-title class="text-subtitle-1">
            <strong> {{ enrollment.raw.name }} - </strong>
            {{ enrollment.raw.courseName }}
          </v-card-title>
          <v-card-item>
            <v-list-item variant="tonal" class="rounded-lg">
              <v-list-item-title class="text-subtitle-2">
                Matriculados
              </v-list-item-title>

              <template #append>
                {{ enrollment.raw.countStudents }} /
                {{ enrollment.raw.minStudents }}
              </template>
              <v-progress-linear
                :max="enrollment.raw.minStudents"
                :model-value="enrollment.raw.countStudents"
                color="dark"
                height="12"
                rounded
              />
              <v-list-item-subtitle>
                <small>
                  Mínimo requerido: {{ enrollment.raw.minStudents }}
                </small>
              </v-list-item-subtitle>
            </v-list-item>
          </v-card-item>
          <v-card-actions>
            <v-btn
              block
              density="comfortable"
              variant="tonal"
              link
              @click="
                router.push({
                  name: 'Course',
                  params: { id: enrollment.raw.moduleId },
                })
              "
            >
              Ver módulo
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4 border-t">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-chevron-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">{{ page }} / {{ pageCount }}</div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-chevron-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>
<script lang="ts" setup>
import { ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { _getEnabledGroups } from "@/app/modules/Course/services";

defineProps<{
  period: string;
}>();

const router = useRouter();
const groups = ref<any[]>([]);
const search = shallowRef("");
const init = async () => {
  try {
    groups.value = await _getEnabledGroups();
  } catch (error) {
    console.error("Error fetching enabled groups:", error);
  }
};

init();
</script>
