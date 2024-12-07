import { getAllData, getDataById } from "../models/pemasukanModel.js";

/**
 * @swagger
 * /pemasukan:
 *   get:
 *     summary: Mendapatkan semua data pemasukan
 *     description: Mendapatkan semua data pemasukan dengan filter query params.
 *     parameters:
 *       - in: query
 *         name: tanggal
 *         description: Tanggal pemasukan
 *         schema:
 *           type: string
 *       - in: query
 *         name: jumlah
 *         description: Jumlah uang yang masuk
 *         schema:
 *           type: string
 *       - in: query
 *         name: deskripsi
 *         description: Deskripsi pemasukan
 *         schema:
 *           type: string
 *       - in: query
 *         name: kategori
 *         description: Kategori pemasukan
 *         schema:
 *           type: string
 *       - in: query
 *         name: dompet
 *         description: Dompet pemasukan
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Daftar pemasukan
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   tanggal:
 *                     type: string
 *                   jumlah:
 *                     type: string
 *                   deskripsi:
 *                     type: string
 *                   kategori:
 *                     type: string
 *                   dompet:
 *                     type: string
 *       400:
 *         description: Parameter query tidak valid
 *       500:
 *         description: Terjadi kesalahan pada server
 */
const getAllPemasukan = async (req, res) => {
  const queryParams = req.query;

  try {
    const data = await getAllData(queryParams);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /pemasukan/{id}:
 *   get:
 *     summary: Mendapatkan pemasukan berdasarkan ID
 *     description: Mendapatkan pemasukan berdasarkan ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID dari pemasukan
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pemasukan ditemukan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 tanggal:
 *                   type: string
 *                 jumlah:
 *                   type: string
 *                 deskripsi:
 *                   type: string
 *                 kategori:
 *                   type: string
 *                 dompet:
 *                   type: string
 *       400:
 *         description: Item tidak ditemukan
 *       500:
 *         description: Terjadi kesalahan pada server
 */
const getPemasukanById = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await getDataById(id);
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getAllPemasukan, getPemasukanById };
