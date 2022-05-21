import {v4 as uuid} from 'uuid';

export interface DestinoViaje{
  id?:string,
  titulo?:string,
  subtitulo?:string,
  imgUrl?:string
  servicios?:string[];
  selected?: boolean;
  votes?:number;
}

/* export class DestinoViaje{

  public selected: boolean = false;
  public servicios:string[];
  public id = uuid();
  public votes = 0;

  constructor(
    public titulo:string,
    public subtitulo:string,
    public imgUrl:string
  ) {
    this.servicios=['desayuno', 'almuerzo', 'cena']
  };

  isSelected(): boolean {
    return this.selected;
  };

  setSelected(value:boolean){
    this.selected = value;
  };

  voteUp() {
    this.votes++;
  }
  voteDown() {
      this.votes--;
  }
} */
