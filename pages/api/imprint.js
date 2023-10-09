import { imprint } from '../../data/imprint-data';

export default function handle (req, res) {
  res.status(200).json(imprint)
}