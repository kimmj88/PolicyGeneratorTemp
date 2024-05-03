import { Ecu, Message, Signal } from 'common/class';

export interface DbcRawParam {
  ecus?: Ecu;
  messages?: Message;
  jsonString?: string;
  jsonObj?: any;
}

/**
 * DBC Raw Class
 */
export class DbcRaw {
  ecus: Ecu[];
  messages: Message[];

  constructor(option?: DbcRawParam) {
    this.ecus = [];
    this.messages = [];

    if (option?.jsonString) {
      this._parse(JSON.parse(option.jsonString));
    }

    if (option?.jsonObj) {
      this._parse(option.jsonObj);
    }
  }

  public _parse(jsonData: any) {
    this.ecus = jsonData?.ecus?.map((ecu) => {
      return new Ecu(ecu);
    });

    if (jsonData?.frames) {
      this.messages = jsonData?.frames?.map((frame) => {
        return new Message(frame);
      });
    } else if (jsonData?.messages) {
      this.messages = jsonData?.messages?.map((message) => {
        return Object.assign(new Message(), {
          ...message,
          signals: message['signals'].map((signal) => {
            return Object.assign(new Signal(), signal);
          }),
        });
      });
    }
  }
  /**
   * json parse
   * @param {string} jsonString - The string for parse dbc class
   */
  public parse(jsonString: string) {
    const data = JSON.parse(jsonString);

    this.ecus = data?.ecus?.map((ecu) => {
      return new Ecu(ecu);
    });

    this.messages = data?.frames?.map((frame) => {
      return new Message(frame);
    });
  }
}
