import pool from '../db';

export async function seedSettings() {
    try {
      const result = await pool.query('SELECT COUNT(*) AS total FROM settings')
      const total = parseInt(result.rows[0].total, 10)
      if (total === 0) {
        const seeds = [
            {
              presetName: 'S1',
              quickBuyPreset: '5.00',
              buyPresets: ['1', '5', '20', '50', '', '', '', ''],
              sellPresets: ['25', '50', '75', '100', '', '', '', ''],
              buySlippage: '7.0',
              sellSlippage: '5.0',
              buyGasFee: '0.0012',
              sellGasFee: '0.0012'
            },
            {
              presetName: 'S2',
              quickBuyPreset: '7.50',
              buyPresets: ['1.5', '7', '30', '75', '', '', '', ''],
              sellPresets: ['20', '40', '60', '80', '', '', '', ''],
              buySlippage: '8.0',
              sellSlippage: '6.0',
              buyGasFee: '0.0015',
              sellGasFee: '0.0015'
            },
            {
              presetName: 'S3',
              quickBuyPreset: '10.00',
              buyPresets: ['2', '10', '40', '100', '', '', '', ''],
              sellPresets: ['30', '60', '90', '120', '', '', '', ''],
              buySlippage: '6.5',
              sellSlippage: '4.5',
              buyGasFee: '0.0020',
              sellGasFee: '0.0020'
            },
          ];
          
  
        for (const item of seeds) {
          const q = `
            INSERT INTO settings (
              "presetName",
              "quickBuyPreset",
              "buyPresets",
              "sellPresets",
              "buySlippage",
              "sellSlippage",
              "buyGasFee",
              "sellGasFee"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            ON CONFLICT ("presetName") DO NOTHING;
          `;
          const vals = [
            item.presetName,
            item.quickBuyPreset,
            item.buyPresets,
            item.sellPresets,
            item.buySlippage,
            item.sellSlippage,
            item.buyGasFee,
            item.sellGasFee,
          ];
          await pool.query(q, vals);
        }
        console.log('Seeded default settings for S1, S2, S3.');
      }
    } catch (err) {
      console.error('Error seeding settings:', err);
    }
  }