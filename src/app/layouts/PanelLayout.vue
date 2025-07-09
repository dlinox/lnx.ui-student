<template>
  <v-app app>
    <v-navigation-drawer
      v-model="drawer"
      temporary
      class="border-r border-primary"
      color="blue-grey-lighten-5"
      :border="1"
    >
      <v-card elevation="0" class="rounded-0" color="primary" variant="tonal">
        <v-card-item class="text-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Logo_UNAP.png/640px-Logo_UNAP.png"
            alt="logo"
            width="70"
          />
        </v-card-item>
        <v-card-subtitle class="border-t py-2">
          <b>
            {{ authStore.authState.user.name }}
          </b>
          <br />
          <small>
            {{ authStore.authState.user?.role?.toUpperCase() }}
          </small>
        </v-card-subtitle>
      </v-card>
      <v-list nav density="compact" color="primary">
        <v-list-item key="panel" title="Panel" to="/" link exact>
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item>

        <v-list-item
          key="enrollment"
          title="Matrículas"
          link
          exact
          :to="{ name: 'Enrollment' }"
        >
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item>
        <!-- 
        <v-list-item key="schedule" title="Horario" to="/mi-horario" link exact>
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item>
 -->
        <v-list-item
          key="module"
          title="Módulos"
          :to="{ name: 'Modules' }"
          link
          exact
        >
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item>
      </v-list>
      <template #append>
        <v-list three-line>
          <v-list-item class="py-2 border-t">
            <template v-slot:append>
              <v-btn
                @click="signOutBtn"
                icon
                density="compact"
                variant="tonal"
                :loading="loading"
                v-tooltip:top="'Cerrar sesión'"
              >
                <LnxIcon iconName="logout-1" />
              </v-btn>
            </template>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main app>
      <v-toolbar class="bg-white px-4 border-b" app>
        <v-avatar class="ms-4 rounded-0">
          <img src="/resources/images/logo.png" alt="logo" width="40" />
        </v-avatar>
        <v-spacer></v-spacer>
        <v-btn
          icon
          class="rounded-lg me-2 d-flex d-md-none"
          variant="text"
          size="small"
          @click="drawer = !drawer"
        >
          <LnxIcon iconName="element-2" />
        </v-btn>
        <v-btn icon class="rounded-lg" variant="tonal" size="small">
          <LnxIcon iconName="user" />
          <v-menu activator="parent">
            <v-list density="compact" nav>
              <v-list-item value="profile">
                <template v-slot:prepend>
                  <LnxIcon iconName="user" />
                </template>
                <v-list-item-title> Perfil </v-list-item-title>
                <v-list-item-subtitle>
                  <small> {{ authStore.authState?.user?.name }}</small>
                </v-list-item-subtitle>
              </v-list-item>
              <v-list-item value="logout" @click="signOutBtn" class="text-red">
                <template v-slot:prepend>
                  <LnxIcon iconName="logout-1" />
                </template>
                <v-list-item-title> Cerrar sesión </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-toolbar>

      <v-card class="rounded-0 bg-white" elevation="0">
        <v-container class="pb-0">
          <v-card-title>
            <h3 class="text-h3 text-md-h3 text-h4 text-primary">
              {{ headingStore?.title }}
            </h3>
          </v-card-title>
          <v-card-subtitle class="mb-2">
            {{ headingStore?.subtitle }}
          </v-card-subtitle>
          <v-tabs class="mt-2 d-none d-md-flex">
            <v-tab value="Dashboard" link exact :to="{ name: 'Dashboard' }">
              Inicio</v-tab
            >
            <v-tab value="Modules" link exact :to="{ name: 'Modules' }">
              Módulos
            </v-tab>
            <v-tab value="Enrollment" link exact :to="{ name: 'Enrollment' }">
              Matrículas
            </v-tab>
          </v-tabs>
        </v-container>
      </v-card>
      <v-card
        v-if="periodStore.enrolled?.period"
        color="info"
        variant="tonal"
        elevation="0"
        class="rounded-0"
      >
        <v-container>
          <v-card-title> ¡Matrículas habilitadas! </v-card-title>
          <v-card-subtitle>
            Las matrículas para el ciclo académico
            <b>{{ periodStore.enrolled?.period }}</b> están habilitadas.
          </v-card-subtitle>
        </v-container>
      </v-card>
      <RouterView />
      <v-footer app>
        <span class="text-caption text-end w-100">
          © {{ new Date().getFullYear() }} Instituto de Informática - UNAP. v1.0
        </span>
      </v-footer>
    </v-main>
  </v-app>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useAuthStore } from "@/app/store/auth.stores";
import { usePeriodStore } from "../store/period.stores";
import { useRouter } from "vue-router";
import { _signOut } from "@/app/modules/Auth/services";
import { useDisplay } from "vuetify";

import { useHeadingStore } from "@/app/store/heading.store";
const headingStore = useHeadingStore();

const display = useDisplay();
const router = useRouter();
const authStore = useAuthStore();
const periodStore = usePeriodStore();

const loading = ref<boolean>(false);
const drawer = ref<boolean>(false);

const signOutBtn = async () => {
  loading.value = true;
  const res = await _signOut();
  if (res) {
    router.push({ name: "Login" });
  }
  loading.value = false;
};

const initLayout = async () => {
  periodStore.getCurrent();
  periodStore.getEnrolled();
};

watch(display.smAndDown, (val) => {
  console.log(val);
  if (!val) {
    drawer.value = false;
  }
});

onMounted(() => {
  console.log("initLayout");
  initLayout();
});
</script>
