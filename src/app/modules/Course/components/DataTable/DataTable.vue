<template>
  <v-card>
    <LnxDataTable :headers="headers()" :loadDataTable="_loadDataTable">
      <template v-slot:header="{ request, loading, initDataTable, loadingTable, debouncedReload, reLoadDataTable }">
        <v-card-item class="border-t border-b">
          <v-row class="d-flex justify-space-between align-center">
            <v-col cols="12" md="4">
              <v-text-field v-model="request.search" label="Buscar" clearable @input="debouncedReload" @click:clear="reLoadDataTable"></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="text-end">
              <v-btn class="me-2" :disabled="loading">
                Nuevo
                <Form :id="null" @success="initDataTable" />
              </v-btn>
              <v-btn icon variant="tonal" density="comfortable" v-tooltip="'Recargar registros'" @click="initDataTable" :loading="loadingTable">
                <LnxIcon iconName="refresh" />
              </v-btn>
            </v-col>
          </v-row>
        </v-card-item>
      </template>
      <template v-slot:item.actions="{ item, loadDataTable }">
        <v-btn icon size="small" variant="text">
          <LnxIcon iconName="setting-5" />
          <v-menu activator="parent">
            <v-list nav>
              <v-list-item title="Editar" density="compact" value="edit">
                <template #prepend><LnxIcon iconName="message-edit" /></template>
                <Form :id="item.id" @success="loadDataTable" />
              </v-list-item>
              <v-list-item title="Eliminar" class="text-red" density="compact" value="delete">
                <LnxDialogConfirm title="Eliminar registro" message="¿Está seguro de eliminar este registro?" @onConfirm="async () => { await _deleteItem(item.id); loadDataTable(); }" />
                <template #prepend><LnxIcon iconName="trash" /></template>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
      <template v-slot:item.isActive="{ item }">
        <LnxStatusChip :value="item.isActive" />
      </template>
    </LnxDataTable>
  </v-card>
</template>
<script setup lang="ts">
import Form from "../Form/Form.vue";
import { _loadDataTable, _deleteItem } from "../../services";
import { headers } from "./constants";
</script>
