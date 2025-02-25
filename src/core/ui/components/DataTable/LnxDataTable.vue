<template>
  <slot
    name="header"
    :request="request"
    :loading="loading"
    :loadingTable="loadingTable"
    :reLoadDataTable="reLoadDataTable"
    :debouncedReload="debouncedReload"
    :initDataTable="initDataTable"
  ></slot>
  <v-data-table-server
    v-model:items-per-page="request.itemsPerPage"
    v-model:sort-by="request.sortBy"
    v-model:page="request.page"
    :headers="headers"
    :items="items"
    :items-length="totalItems"
    :loading="loading"
    last-icon="$last"
    item-value="id"
    :group-by="groupBy"
    multi-sort
    @update:items-per-page="reLoadDataTable"
    @update:sort-by="reLoadDataTable"
    @update:page="reLoadDataTable"
  >
    <template
      v-for="(slotContent, slotName) in $slots"
      :key="slotName"
      v-slot:[slotName]="slotProps"
    >
      <component
        :is="slotContent"
        v-bind="{ ...slotProps, loadDataTable: initDataTable }"
      />
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import { useLnxDataTable } from "./useLnxDataTable";
import type {
  DataTableHeaderDTO,
  DataTableRequestDTO,
  DataTableResponseDTO,
} from "@/core/types/DataTable.types";

const props = defineProps<{
  headers: DataTableHeaderDTO[];
  groupBy?: [];
  loadDataTable: (
    request: DataTableRequestDTO
  ) => Promise<DataTableResponseDTO<any>>;
}>();

const {
  loading,
  loadingTable,
  items,
  totalItems,
  request,
  debouncedReload,
  reLoadDataTable,
  initDataTable,
} = useLnxDataTable(props.loadDataTable);

initDataTable();
</script>
