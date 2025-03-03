<template>
  <v-app app>
    <v-navigation-drawer
      v-model="drawer"
      app
      color="blue-grey-lighten-5 border-primary"
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
      <v-list nav density="compact" v-model:opened="open" color="primary">
        <v-list-item key="panel" title="Panel" to="/" link exact>
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item>

        <!-- <v-list-item key="enrollment" title="Matrículas" link exact>
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item>

        <v-list-item key="schedule" title="Horario" to="/mi-horario" link exact>
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item>

        <v-list-item key="module" title="Módulos" to="/mis-modulos" link exact>
          <template v-slot:prepend>
            <LnxIcon iconName="element-4" />
          </template>
        </v-list-item> -->
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
    <v-app-bar floating elevation="0" app>
      <v-btn icon @click="drawer = !drawer" size="small">
        <LnxIcon iconName="textalign-justifycenter" />
      </v-btn>
      <template v-slot:append> </template>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>
    <v-footer app>
      <v-chip label class="me-2">
        {{ periodStore.current?.name }}
      </v-chip>

      <v-chip label>
        {{ periodStore.enrolled?.name }}
      </v-chip>
      <v-spacer> </v-spacer>
      <small> v1.0 </small>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/app/store/auth.stores";
import { usePeriodStore } from "../store/period.stores";
import LnxIcon from "@/core/ui/components/icons/LnxIcon.vue";

const authStore = useAuthStore();
const periodStore = usePeriodStore();
const drawer = ref(true);

const loading = ref<boolean>(false);
const open = ref([""]);
const signOutBtn = async () => {
  loading.value = true;
  //   const res = await signOut();
  //   if (res) {
  //     router.push({ name: "Login" });
  //   }
  loading.value = false;
};

const initLayout = async () => {
  periodStore.getCurrent();
  periodStore.getEnrolled();
};

onMounted(() => {
  initLayout();
});
</script>
