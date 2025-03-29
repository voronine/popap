import { Router, Request, Response } from 'express'
import pool from '../db'

const router = Router()

router.get(
  '/settings',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await pool.query('SELECT * FROM settings')
      res.json(result.rows)
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
    }
  }
)

router.put(
  '/settings/:presetName',
  async (req: Request, res: Response): Promise<void> => {
    const { presetName } = req.params
    const data = req.body
    try {
      const query = `
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
        ON CONFLICT ("presetName") DO UPDATE SET
          "quickBuyPreset" = EXCLUDED."quickBuyPreset",
          "buyPresets" = EXCLUDED."buyPresets",
          "sellPresets" = EXCLUDED."sellPresets",
          "buySlippage" = EXCLUDED."buySlippage",
          "sellSlippage" = EXCLUDED."sellSlippage",
          "buyGasFee" = EXCLUDED."buyGasFee",
          "sellGasFee" = EXCLUDED."sellGasFee"
        RETURNING *;
      `;
      const values = [
        presetName,
        data.quickBuyPreset,
        data.buyPresets,
        data.sellPresets,
        data.buySlippage,
        data.sellSlippage,
        data.buyGasFee,
        data.sellGasFee
      ];
      const result = await pool.query(query, values);
      res.json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
);

export default router;
