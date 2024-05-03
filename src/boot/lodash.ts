import { boot } from 'quasar/wrappers';
import * as _ from 'lodash';

export default boot(({ app }) => {
  app.config.globalProperties.$_ = _;
});

export { _ };
