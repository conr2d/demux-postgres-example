const { Migration } = require("demux-postgres");

const createTransferTable = new Migration(
     "createTransferTable",
     "public",
     "create_transfer_table.sql",
);

module.exports = [{
   migrations: [createTransferTable],
  sequenceName: "init"
}];
