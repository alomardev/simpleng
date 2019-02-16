export interface Page<T> {
  number: number;
  size: number;
  content: T[];
  totalElements: number;
}