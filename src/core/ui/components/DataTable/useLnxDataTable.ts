import { reactive, ref } from "vue";
import debounce from "@/core/utils/debounce.utils";
import type {
  DataTableResponseDTO,
  DataTableRequestDTO,
} from "@/core/types/DataTable.types";

import { REQUEST_DEFAULT } from "./constants";

export function useLnxDataTable<T>(
  loadDataTable: (
    request: DataTableRequestDTO
  ) => Promise<DataTableResponseDTO<T>>
) {
  const loading = ref<boolean>(false);
  const loadingTable = ref<boolean>(false);
  const items = ref<T[]>([]);
  const totalItems = ref<number>(0);

  const request = reactive<DataTableRequestDTO>(
    Object.assign({}, REQUEST_DEFAULT)
  );

  const debouncedReload = debounce(() => {
    reLoadDataTable();
  }, 400);

  const reLoadDataTable = async () => {
    loadingTable.value = true;
    const response = await loadDataTable(request);
    items.value = response.data;
    totalItems.value = response.total as number;
    loadingTable.value = false;
  };

  const initDataTable = async () => {
    loading.value = true;
    await reLoadDataTable();
    loading.value = false;
  };

  return {
    loading,
    loadingTable,
    items,
    totalItems,
    request,
    debouncedReload,
    reLoadDataTable,
    initDataTable,
  };
}
