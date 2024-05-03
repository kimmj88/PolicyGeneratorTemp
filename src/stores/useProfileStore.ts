import { Profile } from 'common/class';
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: (): {
    profiles: Profile[];
  } => ({
    profiles: [],
  }),
  getters: {
    protocols(): string[] {
      const protocal = this.profiles.find((item) => {
        return item.section === 'PROTOCOL';
      });
      return protocal?.value?.split('|') || [];
    },
  },
  actions: {
    setProfile(data: Profile[]) {
      this.profiles = data;
    },
    clear() {
      this.profiles = [];
    },
  },
});
