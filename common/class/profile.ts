export class Profile {
  section?: string;
  entry?: string;
  value?: string;

  constructor(option?) {
    if (option) {
      this.section = option.section;
      this.entry = option.entry;
      this.value = option.value;
    }
  }
}
