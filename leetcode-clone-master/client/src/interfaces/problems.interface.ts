import { GridColDef } from '@mui/x-data-grid';

export enum Difficulty {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
export interface Problems {
  id: string;
  title: string;
  acceptance: string;
  difficulty: Difficulty;
}

export interface ProblemsTableDataInterface {
  columns: GridColDef[];
  rows: Problems[];
}

export interface PageInfoInterface {
  page: number;
  pageSize: number;
}
