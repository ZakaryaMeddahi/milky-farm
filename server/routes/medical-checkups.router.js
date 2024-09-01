const {
  getAllMedicalCheckups,
} = require('../controllers/medical-checkups.controller');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: MedicalCheckup
 *   description: Medical checkup records management and retrieval
 */

/**
 * @swagger
 * /medical-checkups:
 *   get:
 *     summary: Get all medical checkup records
 *     description: Admins and moderators can retrieve all medical checkup records.
 *     tags: [MedicalCheckup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of medical checkup records
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Medical checkup records retrieved successfully
 *                 cows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MedicalCheckup'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/').get(getAllMedicalCheckups);

module.exports = router;
