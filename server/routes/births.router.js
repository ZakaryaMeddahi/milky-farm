const { getAllBirths } = require('../controllers/births.controller');
const router = require('express').Router();

/**
 * @swagger
 * tags:
 *   name: Births
 *   description: Birth records management and retrieval
 */

/**
 * @swagger
 * /births:
 *   get:
 *     summary: Get all birth records
 *     description: Admins and moderators can retrieve all birth records.
 *     tags: [Births]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of birth records
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
 *                   example: Birth records retrieved successfully
 *                 cows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Birth'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/').get(getAllBirths);

module.exports = router;
