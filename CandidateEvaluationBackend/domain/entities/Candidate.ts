import Location from "./../valuedObjects/Location";

export default class Candidate {
  private _name: string;
  private _email: string;
  private _webAddress: string;
  private _coverLetter: string;
  private _attachment: Blob;
  private _fondOfWorking: boolean;
  private _ip: string;
  private _location: Location;
  // private createdAt: Date;

  constructor(
    name: string,
    email: string,
    webAddress: string,
    coverLetter: string,
    attachment: Blob,
    fondOfWorking: boolean,
    ip: string,
    location: Location
  ) {
    this._name = name;
    this._email = email;
    this._webAddress = webAddress;
    this._coverLetter = coverLetter;
    this._attachment = attachment;
    this._fondOfWorking = fondOfWorking;
    this._ip = ip;
    this._location = location;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get webAddress(): string {
    return this._webAddress;
  }

  public get coverLetter(): string {
    return this._coverLetter;
  }

  public get attachemnt(): Blob {
    return this._attachment;
  }

  public get fondOfWorking(): boolean {
    return this._fondOfWorking;
  }

  public get ip(): string {
    return this._ip;
  }

  public get location(): Location {
    return this._location;
  }

  public toJSON() {
    return {
      name: this._name,
      email: this._email,
      webAddress: this._webAddress,
      coverLetter: this._coverLetter,
      attachment: this._attachment,
      fondOfWorking: this._fondOfWorking,
      ip: this._ip,
      location: {
        area: this._location.area,
        city: this._location.city,
        country: this._location.country,
      },
    };
  }
}
