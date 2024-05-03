import { Arbitration, Attribute, Signal } from 'common/class';

export interface MessageParam {
  arbitration_id?: Arbitration | null;
  is_fd: boolean;
  name?: string;
  size?: number;
  cycle_time?: number;
  comment?: string;
  receivers?: string[];
  transmitters?: string[];
  attributes?: Attribute[];
  signals?: Signal[];
}

export class Message {
  id?: number | undefined;
  isExtend?: boolean;
  isFd?: boolean;
  name?: string;
  size?: number;
  cycle_time?: number;
  comment?: string;
  receivers?: string[];
  transmitters?: string[];
  attributes?: Attribute[];
  signals?: Signal[];

  constructor(option?: MessageParam) {
    this.id =
      option?.arbitration_id?.id != undefined
        ? option?.arbitration_id?.id
        : undefined;
    this.isExtend = option?.arbitration_id?.extended || false;
    this.isFd = option?.is_fd || false;
    this.attributes = option?.attributes || [];
    this.cycle_time = option?.cycle_time || undefined;
    this.name = option?.name || '';
    this.comment = option?.comment || '';
    this.size = option?.size || undefined;
    this.receivers = option?.receivers || [];
    this.transmitters = option?.transmitters || [];

    if (option?.signals) {
      this.signals = option.signals.map((signal) => new Signal(signal));
    }
  }

  getId(): number | undefined {
    return this.id;
  }

  getIsExtend(): boolean | undefined {
    return this.isExtend;
  }

  getIsFd(): boolean | undefined {
    return this.isFd;
  }

  getAttribute(key): Attribute | undefined {
    return this.attributes?.find((item) => {
      return item.key === key;
    });
  }

  getSignals(): Signal[] | undefined {
    return this.signals;
  }

  getSignalCount(): number {
    if (this.signals) {
      return this.signals.length;
    }
    return 0;
  }

  getSendType(): string {
    let result = 'Event';
    if (this.attributes) {
      if (this.attributes['GenMsgSendType']) {
        result = this.attributes['GenMsgSendType'];
      }
    }
    return result;
  }
}
