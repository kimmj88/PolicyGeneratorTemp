import { ExServer } from '../express/exServer';
import * as controller from 'controller';
import { settings } from 'commonBack';
import { Server } from 'http';

export function startServer(): Server {
  const server: ExServer = new ExServer(
    [
      new controller.ProfileController(),
      new controller.PolicyController(),
      new controller.DbcController(),
      new controller.DbcRawController(),
      new controller.DbcRefController(),
      new controller.RuleTypeController(),
      new controller.RuleSetController(),
      new controller.BusRuleValueController(),
    ],
    settings.port
  );

  return server.listen();
}
