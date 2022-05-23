export interface DestinoViaje{
  _id?:string,
  title?:string,
  subtitle?:string,
  imgUrl?:string
  services?:string[];
  selected?: boolean;
  votes?:number;
}
