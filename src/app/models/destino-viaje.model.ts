export interface DestinoViaje{
  id?:string,
  title?:string,
  subtitle?:string,
  imgUrl?:string
  services?:string[];
  selected?: boolean;
  votes?:number;
}
