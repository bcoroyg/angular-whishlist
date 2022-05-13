import {v4 as uuid} from 'uuid';
export class DestinoViaje{

  private selected: boolean = false;
  public servicios:string[];
  public id = uuid();

  constructor(
    public titulo:string,
    public subtitulo:string,
    public imgUrl:string
  ) {
    this.servicios=['desayuno', 'almuerzo', 'cena']
  };

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(value:boolean){
    this.selected = value;
  }
}
