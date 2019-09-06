const { BaseActionWatcher } = require("demux");
const { MassiveActionHandler } = require("demux-postgres");
const { NodeosActionReader } = require("demux-eos");
const massive = require("demux-postgres/node_modules/massive");

const handlerVersion = require("./handlerVersions/v1");
const migrationSequences = require("./migrationSequences");

const dbConfig = {
  host: 'localhost',
  port: 5432,
  database: 'eos',
  schema: 'public',
  user: 'postgres',
  password: '',
};

massive(dbConfig).then((db) => {
  const actionReader = new NodeosActionReader({
     startAtBlock: 77770000, 
     onlyIrreversible: false, 
     nodeosEndpoint: "https://api.eosnewyork.io"
  });
  const actionHandler = new MassiveActionHandler(
    [handlerVersion],
    db,
    dbConfig.schema,
    migrationSequences
  );
  const actionWatcher = new BaseActionWatcher(actionReader, actionHandler, 500);
  actionWatcher.watch();
});
