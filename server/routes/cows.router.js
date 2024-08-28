const router = require('express').Router();
const {
  getCows,
  getCow,
  createCow,
  updateCow,
  deleteCow,
} = require('../controllers/cows.controller');

/**
 * @swagger
 * tags:
 *   name: Cows
 *   description: Cow records management and retrieval
 */

/**
 * @swagger
 * /cows:
 *   get:
 *     summary: Get all cows
 *     description: Admins and moderators can retrieve all cows.
 *     tags: [Cows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of cows
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
 *                   example: Cow records retrieved successfully
 *                 cows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cow'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Create a new cow
 *     description: Admins and moderators can create new cow records.
 *     tags: [Cows]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               entryDate:
 *                 type: string
 *                 format: date
 *               breed:
 *                 type: string
 *                 enum: [Holstein, Montbéliarde]
 *             example:
 *               id: 10
 *               entryDate: '12/12/2023'
 *               breed: Holstein
 *     responses:
 *       "201":
 *         description: Created
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
 *                   example: Cow record created successfully
 *                 cow:
 *                   $ref: '#/components/schemas/Cow'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/').get(getCows).post(createCow);

/**
 * @swagger
 * /cows/{id}:
 *   get:
 *     summary: Get a cow
 *     description: Admins and moderators can fetch a cow record by id.
 *     tags: [Cows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cow id
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
 *                   example: Cow record retrieved successfully
 *                 cow:
 *                   $ref: '#/components/schemas/Cow'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: There is no cow record with this id
 *
 *   put:
 *     summary: Update a cow
 *     description: Admins and moderators can update a cow record by id.
 *     tags: [Cows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cow id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *               entryDate:
 *                 type: string
 *                 format: date
 *               breed:
 *                 type: string
 *                 enum: [Holstein, Montbéliarde]
 *             example:
 *               id: 10
 *               entryDate: '12/12/2023'
 *               breed: Holstein
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
 *                   example: Cow record updated successfully
 *                 cow:
 *                   $ref: '#/components/schemas/Cow'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: There is no cow record with this id
 *   delete:
 *     summary: Delete a cow record
 *     description: Admins and moderators can delete cow records.
 *     tags: [Cows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Cow id
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
 *                   example: Cow record deleted successfully
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 message:
 *                   type: string
 *                   example: There is no cow record with this id
 */
router.route('/:id').get(getCow).put(updateCow).delete(deleteCow);

module.exports = router;
