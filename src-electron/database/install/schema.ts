const pragmaOptionFK = 'PRAGMA foreign_keys = ON;';
const pragmaOptionNM = 'PRAGMA synchronous = NORMAL';
const pragmaOptionJM = 'PRAGMA  journal_mode = DELETE';

const versionSchema = `
    CREATE TABLE version
    (
      version_key INTEGER PRIMARY KEY AUTOINCREMENT,
      version TEXT NOT NULL,
      release_dttm TEXT NOT NULL,
      install_dttm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      build_number INTEGER NOT NULL
    );`;

const policySchema = `
    CREATE TABLE IF NOT EXISTS policy
    (
      policy_key INTEGER PRIMARY KEY AUTOINCREMENT,
      protocol_type TEXT NOT NULL CHECK(protocol_type IN ('CAN', 'ETH')),
      name TEXT NOT NULL,
      creation_dttm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      status TEXT CHECK(status IN ('N', 'P', 'D')) DEFAULT 'N',
      UNIQUE(protocol_type, name)
    );
    `;

const profileSchema = `
    CREATE TABLE IF NOT EXISTS profile(
      section TEXT NOT NULL,
      type TEXT NOT NULL,
      entry TEXT NOT NULL,
      value TEXT,
      UNIQUE(section, entry)
    );
    `;
const dbcSchema = `
  CREATE TABLE IF NOT EXISTS dbc(
    dbc_key INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    path TEXT NOT NULL,
    status TEXT CHECK(status IN ('N', 'P', 'D')) DEFAULT 'N',
    creation_dttm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
  `;
const dbcrefSchema = `
    CREATE TABLE IF NOT EXISTS dbcref(
      dbcref_key INTEGER PRIMARY KEY AUTOINCREMENT,
      policy_key INTEGER,
      dbc_key INTEGER,
      bus_number INTEGER NOT NULL,
      creation_dttm TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(policy_key) REFERENCES policy(policy_key),
      CONSTRAINT 'mydbc_key' FOREIGN KEY(dbc_key) REFERENCES dbc(dbc_key),
      UNIQUE(policy_key, bus_number)
    );
    `;
const ruletypeSchema = `
    CREATE TABLE IF NOT EXISTS ruletype(
      ruletype_key INTEGER PRIMARY KEY,
      type TEXT NOT NULL,
      sub_type TEXT NOT NULL,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      class TEXT NOT NULL
    );
    `;

const busrulevalueSchema = `
    CREATE TABLE IF NOT EXISTS busrulevalue(
      busrulevalue_key INTEGER PRIMARY KEY,
      policy_key INTEGER NOT NULL,
      dbcref_key INTEGER NOT NULL,
      ruletype_key INTEGER NOT NULL,
      value TEXT,
      FOREIGN KEY(policy_key) REFERENCES policy(policy_key),
      FOREIGN KEY(dbcref_key) REFERENCES dbcref(dbcref_key),
      FOREIGN KEY(ruletype_key) REFERENCES ruletype(ruletype_key),
      UNIQUE(policy_key, dbcref_key, ruletype_key)
    );
    `;

const msgrulevalueSchema = `
    CREATE TABLE IF NOT EXISTS msgrulevalue(
      msgrulevalue_key INTEGER PRIMARY KEY,
      policy_key INTEGER NOT NULL,
      dbcref_key INTEGER NOT NULL,
      ruletype_key INTEGER NOT NULL,
      msgrule_id TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY(policy_key) REFERENCES policy(policy_key),
      FOREIGN KEY(dbcref_key) REFERENCES dbcref(dbcref_key),
      FOREIGN KEY(ruletype_key) REFERENCES ruletype(ruletype_key),
      UNIQUE(dbcref_key, ruletype_key, msgrule_id)
    );
    `;

const signalrulevalueSchema = `
    CREATE TABLE IF NOT EXISTS signalrulevalue(
      signalrulevalue_key INTEGER PRIMARY KEY,
      policy_key INTEGER NOT NULL,
      dbcref_key INTEGER NOT NULL,
      ruletype_key INTEGER NOT NULL,
      msgrule_id TEXT,
      signalrule_id TEXT NOT NULL,
      value TEXT NOT NULL,
      FOREIGN KEY(policy_key) REFERENCES policy(policy_key),
      FOREIGN KEY(dbcref_key) REFERENCES dbcref(dbcref_key),
      FOREIGN KEY(ruletype_key) REFERENCES ruletype(ruletype_key),
      UNIQUE(dbcref_key, ruletype_key, signalrule_id)
    );
    `;

const ruleTypePrevalue = `INSERT INTO ruletype (ruletype_key, type, sub_type, name, description, class) VALUES
                          (1001, 'MSG', 'DL', 'Data Length Error', 'Message data length is error.', ''),
                          (1002, 'MSG', 'AC', 'Anomaly Cycle', 'Anomaly cycle detection.', ''),
                          (4001, 'BUS', 'UAID', 'Unknown Arb Id', 'Arbitration ID is unknown', 'UnknownIdBusRuleValue'),
                          (4002, 'BUS', 'LH', 'The bus loads too high', 'The bus loads too high', 'LoadHighBusRuleValue'),
                          (4003, 'BUS', 'LL', 'The bus loads too low', 'The bus loads too low', 'LoadLowBusRuleValue'),
                          (4004, 'BUS', 'DMU', 'Unknown DIAG Id', 'DIAG Message is unknown', 'DIAGMessageBusRuleValue'),
                          (4005, 'BUS', 'DMI', 'DIAG Message Invalid', 'DIAG Message is invalid', 'DIAGAttackBusRuleValue'),
                          (4006, 'BUS', 'DAD', 'DOS Attack Detect', 'DOS attack detect', 'UnknownDIAGBusRuleValue');`

// const ruleType_MULTI_VALUE =
//   "INSERT INTO ruletype (ruletype_key, type, sub_type, name) VALUES (2000, 'SGN', 'MV', 'MULTI_VALUE');";
// const ruleType_COUNTER =
//   "INSERT INTO ruletype (ruletype_key, type, sub_type, name) VALUES (2001, 'SGN', 'CT', 'COUNTER');";
// const ruleType_CONST =
//   "INSERT INTO ruletype (ruletype_key, type, sub_type, name) VALUES (2002, 'SGN', 'CT', 'CONST');";

// const ruleType_SENSOR =
//   "INSERT INTO ruletype (ruletype_key, type, sub_type, name) VALUES (2003, 'SGN', 'SS', 'SENSOR');";
// const ruleType_BINARY =
//   "INSERT INTO ruletype (ruletype_key, type, sub_type, name) VALUES (2004, 'SGN', 'BR', 'BINARY');";
// const ruleType_CHECK_SUM =
//   "INSERT INTO ruletype (ruletype_key, type, sub_type, name) VALUES (2005, 'SGN', 'CS', 'CHECK_SUM');";

const profilePrevalue =
  "INSERT INTO profile(section, entry, type, value) VALUES('PROTOCOL', 'POLICY_TYPE', 'S', 'CAN|ETH');";

const versionPrevalue =
  "INSERT INTO version(version, release_dttm, build_number) VALUES('AUTOCRYPT PolicyGenerator Database 1.0.0', '2024/03/06 12:00:00', 1);";

export const schemaList: string[] = [
  pragmaOptionFK,
  pragmaOptionNM,
  pragmaOptionJM,
  versionSchema,
  policySchema,
  dbcSchema,
  dbcrefSchema,
  ruletypeSchema,
  busrulevalueSchema,
  msgrulevalueSchema,
  signalrulevalueSchema,
  profileSchema,
  profilePrevalue,
  ruleTypePrevalue
];
