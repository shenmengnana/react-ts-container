interface FnType {
  (key: string, value: number): void;
}
interface FnType2 {
  (key: string, value: string): void;
}
export interface AttributeCompProps {
  onChange: FnType | FnType2;
}
