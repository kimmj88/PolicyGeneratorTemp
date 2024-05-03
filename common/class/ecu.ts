import { Attribute } from 'common/class';

export interface EcuParam {
  name: string;
  comment?: string;
  attributes?: Attribute;
}

export class Ecu {
  name: string;
  comment?: string;
  attributes?: Attribute;

  constructor(option?) {
    this.name = option?.name || '';
    this.comment = option?.comment || '';
    this.attributes = option?.attributes || {};
  }
}
