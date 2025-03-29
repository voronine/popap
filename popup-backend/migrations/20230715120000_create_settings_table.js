exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('settings', {
    id: { type: 'serial', primaryKey: true },
    presetName: { type: 'varchar(10)', notNull: true, unique: true },
    quickBuyPreset: { type: 'text' },
    buyPresets: { type: 'text[]' },
    sellPresets: { type: 'text[]' },
    buySlippage: { type: 'text' },
    sellSlippage: { type: 'text' },
    buyGasFee: { type: 'text' },
    sellGasFee: { type: 'text' }
  },
  { ifNotExists: true }
);
};

exports.down = (pgm) => {
  pgm.dropTable('settings');
};
