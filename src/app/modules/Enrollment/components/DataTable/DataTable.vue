<template>
  <v-card>
    <LnxDataTable :headers="headers()" :loadDataTable="_loadDataTable">
      <template
        v-slot:header="{
          request,
          initDataTable,
          loadingTable,
          debouncedReload,
          reLoadDataTable,
        }"
      >
        <v-card-item class="border-t border-b">
          <v-row class="d-flex justify-space-between align-center">
            <v-col cols="12" md="4">
              <v-text-field
                v-model="request.search"
                label="Buscar"
                clearable
                @input="debouncedReload"
                @click:clear="reLoadDataTable"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="text-end">
              <v-btn
                icon
                variant="tonal"
                density="comfortable"
                v-tooltip="'Recargar registros'"
                @click="initDataTable"
                :loading="loadingTable"
              >
                <LnxIcon iconName="refresh" />
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </template>
      <template v-slot:item.actions="{ item, loadDataTable }">
        <div class="d-flex flex-column">
          <v-btn
            v-if="
              item.period == periodStore?.enrolled?.name &&
              item.enrollmentStatus == 'MATRICULADO'
            "
            variant="flat"
            density="comfortable"
            v-tooltip="'Cambiar de grupo'"
          >
            Cambiar grupo
            <ChangeEnrollmentGroup @success="loadDataTable" :group="item" />
          </v-btn>
          <v-btn
            v-if="
              item.period == periodStore?.enrolled?.name &&
              item.enrollmentStatus == 'MATRICULADO'
            "
            color="indigo-darken-2"
            variant="flat"
            density="comfortable"
            v-tooltip="'Reservar matrícula'"
          >
            <LnxDialogConfirm
              title="Reservar matrícula"
              message="¿Estás seguro de reservar la matrícula?, no podrás deshacer esta acción."
              @onConfirm="
                () => {
                  _reserverGroupEnrollment({ id: item.id });
                  loadDataTable();
                }
              "
            />
            Reservar
          </v-btn>
        </div>
      </template>
      <template v-slot:item.course="{ item }">
        <v-list-item>
          <v-list-item-title class="text-subtitle-2 font-weight-bold">
            {{ item.course }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.area }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
      <template v-slot:item.group="{ item }">
        <v-list-item>
          <v-list-item-title class="text-subtitle-2">
            {{ item.period }} -
            <span class="text-primary font-weight-bold">
              {{ item.group }}
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.laboratory }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            {{ item.modality }}
          </v-list-item-subtitle>
        </v-list-item>
      </template>
    </LnxDataTable>
  </v-card>
</template>
<script setup lang="ts">
import { _loadDataTable, _reserverGroupEnrollment } from "../../services";
import { headers } from "./constants";
import { usePeriodStore } from "@/app/store/period.stores";
import ChangeEnrollmentGroup from "@/app/modules/Enrollment/components/ChangeEnrollmentGroup/ChangeEnrollmentGroup.vue";
const periodStore = usePeriodStore();
</script>
