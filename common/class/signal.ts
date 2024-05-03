import { Attribute } from 'common/class';

export interface SignalParam {
  name?: string;
  start_bit?: number;
  size?: number;
  is_little_endian?: boolean;
  is_signed?: boolean;
  factor?: number;
  offset?: number;
  max?: number;
  min?: number;
  unit?: string;
  comment?: string;
  attributes?: Attribute[];
  values?: string[];
}

export class Signal {
  name?: string;
  startBit?: number;
  size?: number;
  isLittleEndian?: boolean;
  isSign?: boolean;
  factor?: number;
  offset?: number;
  max?: number;
  min?: number;
  unit?: string;
  comment?: string;
  attributes?: Attribute[];
  values?: string[];

  constructor(option?: SignalParam) {
    this.name = option?.name;
    this.comment = option?.comment;
    this.attributes = option?.attributes;
    this.values = option?.values;
    this.unit = option?.unit;
    this.max = option?.max || undefined;
    this.min = option?.min || undefined;
    this.factor = option?.factor || undefined;
    this.offset = option?.offset || undefined;
    this.isSign = option?.is_signed || false;
    this.isLittleEndian = option?.is_little_endian || false;
    this.startBit = option?.start_bit || undefined;
    this.size = option?.size || undefined;
  }
}
