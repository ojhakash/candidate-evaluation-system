export default class Location {
  private _country: string;
  private _city: string;
  private _area: string;

  constructor(country: string, city: string, area: string) {
    this._country = country;
    this._city = city;
    this._area = area;
  }

  public get country() : string {
    return this._country;
  }

  public get city() : string {
    return this._city;
  }

  public get area() : string {
    return this._area;
  }
}
