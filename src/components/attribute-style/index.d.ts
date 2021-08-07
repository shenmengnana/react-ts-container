import {FormInstance} from 'rc-field-form';
import {ObjectAny, SelectObjType} from '@/store/reducers/index.d';
interface FnType {
  (key: string, value: number): void;
}
interface FnType2 {
  (key: string, value: string): void;
}
export interface AttributeCompProps {
  onChange: FnType | FnType2;
}
export interface BackgroundProps {
  form: FormInstance;
  upload: (e: ObjectAny) => void;
}
