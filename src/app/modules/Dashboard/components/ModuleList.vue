<template>
  <v-row>
    <v-col v-for="module in moduleItems" :key="module.id" cols="12" md="4">
      <v-card elevation="0" class="rounded-5 border" variant="tonal">
        <v-img
          height="50px"
          src="https://media.istockphoto.com/id/1218737747/vector/learning-online-e-learning-video-call-chat-with-class-distance-education.jpg?s=612x612&w=0&k=20&c=fFFwc3CTP4XtvmruZLiK8EzAbzvAxJL_kw5BsA7z7w8="
          cover
        ></v-img>
        <v-card-title>{{ module.name }}</v-card-title>
        <v-card-item>
          {{ module.description }}
        </v-card-item>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            @click="router.push({ name: 'Course', params: { id: module.id } })"
            link
          >
            ver curso
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { _getModulesByCurriculum } from "@/app/modules/Module/services";

const router = useRouter();
const moduleItems = ref<any[]>([]);
const initComponent = async () => {
  moduleItems.value = await _getModulesByCurriculum(2);
};

initComponent();
</script>
