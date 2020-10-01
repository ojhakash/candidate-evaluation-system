export default class Comment {
  private _candidateId: string;
  private _adminId: string;
  private _commentText: string;

  constructor(candidateId: string, adminId: string, commentText: string) {
    this._candidateId = candidateId;
    this._adminId = adminId;
    this._commentText = commentText;
  }

  public getJSON() {
    return {
      candidateId: this._candidateId,
      adminId: this._adminId,
      commentText: this._commentText,
    };
  }

  public get candidateId(): string {
    return this._candidateId;
  }

  public get adminId(): string {
    return this._adminId;
  }

  public get commentText(): string {
    return this._commentText;
  }
}
