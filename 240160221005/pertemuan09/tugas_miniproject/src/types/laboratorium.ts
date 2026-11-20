export const STATUS_VALUES = ['tersedia', 'digunakan', 'perbaikan'] as const;
export type LabStatus = typeof STATUS_VALUES[number];

export const SORT_FIELDS = ['id', 'nama', 'kapasitas', 'lokasi', 'status'] as const;
export type SortField = typeof SORT_FIELDS[number];

export type OrderDir = 'asc' | 'desc';

export interface CreateLaboratoriumInput {
  nama: string;
  kapasitas: number;
  lokasi: string;
  status?: LabStatus;
}

export interface UpdateLaboratoriumInput {
  nama?: string;
  kapasitas?: number;
  lokasi?: string;
  status?: LabStatus;
}

export interface FindAllFilters {
  status?: LabStatus;
  minKapasitas?: number;
  search?: string;
  sortBy?: SortField;
  order?: OrderDir;
}