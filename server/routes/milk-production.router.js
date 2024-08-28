const router = require('express').Router();
const {
  createMilkProduction,
  getMilkProductions,
  getMilkProduction,
  updateMilkProduction,
  deleteMilkProduction,
} = require('../controllers/milk-production.controller');

/**
 * @swagger
 * tags:
 *   name: MilkProduction
 *   description: Milk production management and retrieval
 */

/**
 * @swagger
 * /milk-production:
 *   get:
 *     summary: Get all milk production records
 *     description: Admins and moderators can retrieve all milk production records.
 *     tags: [MilkProduction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         description: Maximum number of milk productions
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
 *                   example: Milk production record retrieved successfully
 *                 cows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/MilkProduction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Create a new milk production record
 *     description: Admins and moderators can create new milk production records.
 *     tags: [MilkProduction]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productionDate:
 *                 type: string
 *                 format: date
 *               quantity:
 *                 type: number
 *             example:
 *               productionDate: '12/12/2023'
 *               quantity: 30
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
 *                   example: Milk production record created successfully
 *                 cow:
 *                   $ref: '#/components/schemas/MilkProduction'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/').get(getMilkProductions).post(createMilkProduction);

/**
 * @swagger
 * /milk-production/{id}:
 *   get:
 *     summary: Get a milk production record
 *     description: Admins and moderators can fetch a milk production record by id.
 *     tags: [MilkProduction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Milk production id
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
 *                   example: Milk production record retrieved successfully
 *                 cow:
 *                   $ref: '#/components/schemas/MilkProduction'
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
 *                   example: There is no milk production record with this id
 *
 *   put:
 *     summary: Update a milk production record
 *     description: Admins and moderators can update a milk production record by id.
 *     tags: [MilkProduction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Milk production id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productionDate:
 *                 type: string
 *                 format: date
 *               quantity:
 *                 type: number
 *             example:
 *               productionDate: '12/12/2023'
 *               quantity: 20
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
 *                   example: Milk production record updated successfully
 *                 cow:
 *                   $ref: '#/components/schemas/MilkProduction'
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
 *                   example: There is no milk production record with this id
 *   delete:
 *     summary: Delete a  milk production record
 *     description: Admins and moderators can delete  milk production records.
 *     tags: [MilkProduction]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description:  Milk production id
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
 *                   example:  Milk production record deleted successfully
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
 *                   example: There is no  milk production record with this id
 */
router
  .route('/:id')
  .get(getMilkProduction)
  .put(updateMilkProduction)
  .delete(deleteMilkProduction);

module.exports = router;
