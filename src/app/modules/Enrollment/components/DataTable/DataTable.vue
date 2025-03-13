<template>
  <v-card>
    <LnxDataTable :headers="headers()" :loadDataTable="_loadDataTable">
      <template v-slot:header="{
        request,
        initDataTable,
        loadingTable,
        debouncedReload,
        reLoadDataTable,
      }">
        <v-card-item class="border-t border-b">
          <v-row class="d-flex justify-space-between align-center">
            <v-col cols="12" md="4">
              <v-text-field v-model="request.search" label="Buscar" clearable @input="debouncedReload"
                @click:clear="reLoadDataTable"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="text-end">
              <v-btn icon variant="tonal" density="comfortable" v-tooltip="'Recargar registros'" @click="initDataTable"
                :loading="loadingTable">
                <LnxIcon iconName="refresh" />
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </template>
      <template v-slot:item.actions="{ item, loadDataTable }">
        <v-menu density="compact"
          v-if="item.period == periodStore?.enrolled?.name && (item.enrollmentStatus == 'MATRICULADO' || item.enrollmentStatus == 'RESERVADO')">
          <template v-slot:activator="{ props }">
            <v-btn icon color="primary" v-bind="props" density="compact" variant="tonal">
              <LnxIcon iconName="setting-5" />
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item value="changeGroup" v-if="item.enrollmentStatus == 'MATRICULADO'">
              <ChangeEnrollmentGroup @success="loadDataTable" :group="item" />
              Cambiar grupo
            </v-list-item>
            <v-list-item v-if="item.enrollmentStatus == 'MATRICULADO'" value="reserver">
              <LnxDialogConfirm title="Reservar matrícula"
                message="¿Estás seguro de que deseas reservar la matrícula? Esta acción es irreversible y no podrás deshacerla."
                @onConfirm="
                  () => {
                    _reserverGroupEnrollment({ id: item.id });
                    loadDataTable();
                  }
                ">
                <v-alert>
                  <small>
                    Si decide reservar la matrícula, el pago no podrá ser utilizado para otro curso, grupo o módulo. La
                    reserva asegura su cupo, pero el monto abonado quedará exclusivamente asociado a esa matrícula.
                  </small>
                </v-alert>
              </LnxDialogConfirm>
              Reservar
            </v-list-item>

            <v-list-item value="cancel" v-if="
              item.enrollmentStatus == 'MATRICULADO' || item.enrollmentStatus == 'RESERVADO'">
              <LnxDialogConfirm title="Cancelar matrícula"
                message="¿Estás seguro de que deseas cancelar la matrícula? Esta acción es irreversible y podría afectar el uso de tu pago."
                @onConfirm="
                  () => {
                    _cancelGroupEnrollment({ id: item.id });
                    loadDataTable();
                  }
                ">
                <v-alert>
                  <small>
                    Si cancela su matrícula, podrá aplicar el pago realizado a la inscripción de otro curso o módulo
                    dentro de la plataforma.
                  </small>
                </v-alert>
              </LnxDialogConfirm>
              Cancelar matrícula
            </v-list-item>
          </v-list>
        </v-menu>

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
import { _loadDataTable, _reserverGroupEnrollment, _cancelGroupEnrollment } from "../../services";
import { headers } from "./constants";
import { usePeriodStore } from "@/app/store/period.stores";
import ChangeEnrollmentGroup from "@/app/modules/Enrollment/components/ChangeEnrollmentGroup/ChangeEnrollmentGroup.vue";
const periodStore = usePeriodStore();
</script>
