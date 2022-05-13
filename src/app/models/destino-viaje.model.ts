export class DestinoViaje{

  private selected: boolean = false;

  constructor(
    public titulo:string,
    public subtitulo:string,
    public imgUrl:string
  ) {};

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(value:boolean){
    this.selected = value;
  }
}
