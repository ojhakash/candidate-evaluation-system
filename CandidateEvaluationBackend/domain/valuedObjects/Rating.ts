export default class Rating {
  private _candidateId: string;
  private _adminId: string;
  private _ratedValue: number;

  constructor(candidateId: string, adminId: string, ratedValue: number) {
    this._candidateId = candidateId;
    this._adminId = adminId;
    this._ratedValue = ratedValue;
  }

  public getJSON() {
    return {
      candidateId: this._candidateId,
      adminId: this._adminId,
      ratedValue: this._ratedValue,
    };
  }
  public get adminId(): string {
    return this._adminId;
  }

  public get candidateId(): string {
    return this._candidateId;
  }

  public get ratedValue(): number {
    return this._ratedValue;
  }
}
