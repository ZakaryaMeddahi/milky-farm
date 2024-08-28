const router = require('express').Router();
const {
  getBirths,
  getBirth,
  createBirth,
  updateBirth,
  deleteBirth,
} = require('../controllers/births.controller');

/**
 * @swagger
 * tags:
 *   name: Births
 *   description: Birth records management and retrieval
 */

/**
 * @swagger
 * /cows/{cowId}/births:
 *   get:
 *     summary: Get all birth records
 *     description: Admins and moderators can retrieve all birth records.
 *     tags: [Births]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cowId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cow id
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
 *   post:
 *     summary: Create a new birth record
 *     description: Admins and moderators can create new birth record.
 *     tags: [Births]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cowId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Cow id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               birthDate:
 *                 type: string
 *                 format: date
 *               motherCowId:
 *                 type: number
 *             example:
 *               birthDate: '12/12/2023'
 *               motherCowId: 1
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
 *                   example: Birth record created successfully
 *                 cow:
 *                   $ref: '#/components/schemas/Birth'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/:cowId/births').get(getBirths).post(createBirth);

/**
 * @swagger
 * /cows/{cowId}/births/{id}:
 *   get:
 *     summary: Get a birth record
 *     description: Admins and moderators can fetch a birth record by id.
 *     tags: [Births]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cowId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cow id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Birth id
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
 *                   example: Birth record retrieved successfully
 *                 cow:
 *                   $ref: '#/components/schemas/Birth'
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
 *                   example: There is no birth record with this id
 *
 *   put:
 *     summary: Update a birth record
 *     description: Admins and moderators can update a birth record by id.
 *     tags: [Births]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cowId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cow id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Birth id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               birthDate:
 *                 type: string
 *                 format: date
 *               motherCowId:
 *                 type: number
 *             example:
 *               birthDate: '12/12/2023'
 *               motherCowId: 1
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
 *                   example: Birth record updated successfully
 *                 cow:
 *                   $ref: '#/components/schemas/Birth'
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
 *                   example: There is no birth record with this id
 *   delete:
 *     summary: Delete a birth record
 *     description: Admins and moderators can delete birth records.
 *     tags: [Births]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cowId
 *         required: true
 *         schema:
 *           type: string
 *         description: Cow id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Birth id
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
 *                   example: Birth record deleted successfully
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
 *                   example: There is no birth record with this id
 */
router.route('/:cowId/births/:id').get(getBirth).put(updateBirth).delete(deleteBirth);

module.exports = router;