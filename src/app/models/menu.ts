
export enum Statut {
  Actif = 'actif',
  Inactif = 'inactif',
}

export class Menu {
  constructor(
    public id: number = 0,
    public nom: string = '',
    public description: string = '',
    public dateCreation: string = Menu.formatDate(new Date()),
    public statut: Statut = Statut.Actif,
  ) {}

  static fromJson(json: any): Menu {
    const dateCreation = json.date_creation
      ? Menu.formatDate(new Date(json.date_creation))
      : Menu.formatDate(new Date());
    return new Menu(
      json.id,
      json.nom,
      json.description,
      dateCreation,
      json.statut
    );
  }

  static formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}
