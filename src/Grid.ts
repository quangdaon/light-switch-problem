export class Grid {
  public cells: boolean[] = [];
  constructor(public size: number) {
    this.cells = [...new Array(size)].map((_) => false);
  }
}
