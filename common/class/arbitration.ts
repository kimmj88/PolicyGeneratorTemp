export class Arbitration {
  id: number;
  extended: boolean;

  constructor(option?) {
    this.id = option?.id || undefined;
    this.extended = option?.extended || false;
  }
}
