import { Request, Response } from 'express';

const healthController = (req: Request, res: Response) => {
  res.json({ status: 'ok', uptime: process.uptime() });
};

export default healthController;
