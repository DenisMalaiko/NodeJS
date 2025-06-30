export class Tea {
  id: string;
  name: string;
  origin: string;
  rating: number;
  brewTemp: number;
  notes: string;
  constructor(
    name: string,
    origin: string,
    rating: number,
    brewTemp: number,
    notes: string,
  ) {
    this.id = new Date().toISOString();
    this.name = name;
    this.origin = origin;
    this.rating = rating;
    this.brewTemp = brewTemp;
    this.notes = notes;
  }
}