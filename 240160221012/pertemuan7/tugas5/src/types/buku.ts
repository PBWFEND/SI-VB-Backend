export interface Buku {
  id: number;
  judul: string;
  penulis: string;
  tahun: number;
  stok: number;
}

export interface CreateBukuInput {
  judul: string;
  penulis: string;
  tahun: number;
  stok: number;
}

export type UpdateBukuInput = CreateBukuInput;
export type PatchBukuInput = Partial<UpdateBukuInput>;