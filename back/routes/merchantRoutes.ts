import { Router } from 'express';

export const merchantRoutes = Router();

merchantRoutes.get('/', (req, res) => {
  res.send("return all mercants");
});