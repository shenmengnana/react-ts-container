
export interface CompTypes {
  type: string
}
export interface CompProps {
  id:string,
  type: string,
  value: string,
  style: object,
  position: {
    x: number,
    y: number,
    [a:string]: any
  },
  [key:string]:any
}
