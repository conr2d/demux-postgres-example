function parseTokenString(tokenString) {
  const [amountString, symbol] = tokenString.split(" ");
  const amount = parseFloat(amountString);
  return { amount, symbol };
}

function updateTransferData(db, payload, blockInfo) {
  //console.debug(payload);
  const { amount, symbol } = parseTokenString(payload.data.quantity);
  db.transfer.insert({
    txid: payload.transactionId,
    act: payload.actionIndex,
    from: payload.data.from,
    to: payload.data.to,
    amount: amount,
    symbol: symbol,
    memo: payload.data.memo,
  });
}

const updaters = [
  {
    actionType: "eosio.token::transfer",
    apply: updateTransferData,
  },
];

function logUpdate(_, payload) {
   /* not implemented */
}

const effects = [
  {
    actionType: "eosio.token::transfer",
    run: logUpdate,
  },
];

const handlerVersion = {
  versionName: "v1",
  updaters,
  effects,
};

module.exports = handlerVersion;
