export const select_dbcrefBYdbc_inner = `SELECT dr.dbcref_key, dr.policy_key, dr.dbc_key, c.name as dbc_name, dr.bus_number, dr.bus_number, dr.creation_dttm
FROM dbcref dr, dbc c WHERE c.dbc_key = dr.dbc_key AND`;

export const where_dbcrefBYdbc_inner: string[] = [
  'dr.dbcref_key = $dbcref_key',
  'dr.policy_key = $policy_key',
];

export const select_busruleBYruletype_inner = `SELECT br.busrulevalue_key, br.policy_key, br.dbcref_key, rt.ruletype_key, rt.sub_type, br.value
FROM busrulevalue br, ruletype rt
WHERE br.ruletype_key = rt.ruletype_key AND`;

export const where_busruleBYruletype_inner: string[] = [
  'br.policy_key = $policy_key',
  'br.dbcref_key = $dbcref_key',
];

export const select_msgruleBYruletype_inner = `SELECT mr.msgrulevalue_key, mr.policy_key, mr.dbcref_key, rt.type AS rule_type, rt.name AS rule_name, mr.msgrule_id, mr.value
FROM msgrulevalue mr, ruletype rt
WHERE mr.ruletype_key = rt.ruletype_key AND`;

export const where_msgruleBYruletype_inner: string[] = [
  'mr.policy_key = $policy_key',
  'mr.dbcref_key = $dbcref_key',
  "mr.msgrule_id = '$msgrule_id'",
];

export const select_signalruleBYruletype_inner = `SELECT sr.signalrulevalue_key, sr.policy_key, sr.dbcref_key,  rt.type AS rule_type, rt.name AS rule_name, sr.msgrule_id, sr.signalrule_id, sr.value
FROM signalrulevalue sr, ruletype rt
WHERE sr.ruletype_key = rt.ruletype_key AND`;

export const where_signalruleBYruletype_inner: string[] = [
  'sr.policy_key = $policy_key',
  'sr.dbcref_key = $dbcref_key',
  "sr.msgrule_id = '$msgrule_id'",
];

export const select_ruleset_count = `SELECT
(SELECT COUNT(*) FROM busrulevalue WHERE dbcref_key = $dbcref_key) +
(SELECT COUNT(*) FROM msgrulevalue WHERE dbcref_key = $dbcref_key) +
(SELECT COUNT(*) FROM signalrulevalue WHERE dbcref_key = $dbcref_key)
AS total_count;`;
