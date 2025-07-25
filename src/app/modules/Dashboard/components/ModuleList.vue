<template>
  <v-row>
    <v-col cols="12">
      <v-card :title="props.title" :subtitle="props.subtitle" elevation="0">
        <v-card-item>
          <v-text-field
            class="mx-auto"
            label="Buscar"
            hide-details
            clearable
            v-model="searchQuery"
          ></v-text-field>
        </v-card-item>
      </v-card>
    </v-col>

    <v-col cols="12" v-if="loading">
      <v-skeleton-loader
        class="mx-auto"
        elevation="2"
        type="article, actions"
      ></v-skeleton-loader>
    </v-col>

    <v-col cols="12" v-else-if="moduleItems.length === 0">
      <v-empty-state
        image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/teamwork.png"
      >
        <template v-slot:title>
          <div class="text-subtitle-2 mt-8">No tienes módulos registrados</div>
        </template>

        <template v-slot:text>
          <div class="text-caption">
            Matricúlese a un módulo para ver los cursos
          </div>
        </template>

        <template v-slot:actions>
          <v-btn
            class="text-none"
            color="white"
            elevation="1"
            link
            @click="router.push({ name: 'Modules' })"
            text="Ver todos los modulos"
          >
          </v-btn>
        </template>
      </v-empty-state>
    </v-col>

    <v-col v-for="module in filteredModuleItems" :key="module.id" cols="12">
      <v-card elevation="2">
        <v-card-subtitle
          v-if="module.isExtracurricular == 1"
          class="text-caption text-primary pt-3"
        >
          <v-chip density="compact" color="indigo" class="text-subtitle-2">
            <small> Extracurricular / Especial </small>
          </v-chip>
        </v-card-subtitle>

        <v-card-title>
          {{ module.name }}
        </v-card-title>
        <v-row>
          <v-col cols="6">
            <v-list-item>
              <template #prepend>
                <v-avatar color="blue" size="40" rounded="lg">
                  <LnxIcon iconName="book" />
                </v-avatar>
              </template>
              <v-list-item-title class="text-h5">
                {{ module.coursesCount }}
              </v-list-item-title>
              <v-list-item-subtitle> Cursos Disponibles </v-list-item-subtitle>
            </v-list-item>
          </v-col>
          <v-col cols="6">
            <v-list-item>
              <template #prepend>
                <v-avatar color="amber-accent-3" size="40" rounded="lg">
                  <LnxIcon iconName="book-saved" />
                </v-avatar>
              </template>
              <v-list-item-title class="text-h5">
                {{ module.coursesEnrollmentCount }}
              </v-list-item-title>
              <v-list-item-subtitle>Cursos Matriculados </v-list-item-subtitle>
            </v-list-item>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="outlined"
            @click="router.push({ name: 'Course', params: { id: module.id } })"
            link
          >
            ver modulo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { _getModulesByCurriculum } from "@/app/modules/Module/services";

const props = defineProps<{
  title: string;
  subtitle: string;
  onlyEnrolled: boolean;
}>();

const loading = ref<boolean>(true);
const router = useRouter();
const moduleItems = ref<any[]>([]);
const searchQuery = ref("");

const filteredModuleItems = computed(() => {
  return moduleItems.value.filter((module) =>
    module.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const initComponent = async () => {
  loading.value = true;
  moduleItems.value = await _getModulesByCurriculum({
    onlyEnrolled: props.onlyEnrolled,
  });
  loading.value = false;
};

initComponent();
</script>
