interface DataTableRequestDTO {
    page: number;
    itemsPerPage: number;
    query?: Record<string, any>;
    filters?: Record<string, any>;
    sortBy?: any[];
    search?: string | null;
    groupBy?: string;
  }
  
  interface DataTableResponseDTO<T> {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    per_page: number;
    to: number;
    total: number;
  }
  
  interface DataTableHeaderDTO {
    key?: string;
    value?: string;
    title?: string;
    fixed?: boolean;
    align?: "start" | "end" | "center";
    width?: number | string;
    minWidth?: string;
    maxWidth?: string;
    nowrap?: boolean;
    headerProps?: Record<string, any>;
    cellProps?: Record<string, any> | ((data: any) => Record<string, any>);
    sortable?: boolean;
    sort?: (a: any, b: any) => number;
    sortRaw?: (a: any, b: any) => number;
    filter?: (value: any, search: any) => boolean;
    mobile?: boolean;
    children?: DataTableHeaderDTO[];
  }
  
  
  
  export {
    type DataTableRequestDTO,
    type DataTableResponseDTO,
    type DataTableHeaderDTO,
  };
  