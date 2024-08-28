const router = require('express').Router();

const {
  createMedicalCheckup,
  getMedicalCheckups,
  getMedicalCheckup,
  updateMedicalCheckup,
  deleteMedicalCheckup,
} = require('../controllers/medical-checkups.controller');

/**
 * @swagger
 * tags:
 *   name: MedicalCheckup
 *   description: Medical checkup records management and retrieval
 */

/**
 * @swagger
 * /cows/{cowId}/medical-checkup:
 *   get:
 *     summary: Get all medical checkup records
 *     description: Admins and moderators can retrieve all medical checkup records.
 *     tags: [MedicalCheckup]
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
 *   post:
 *     summary: Create a new medical checkup record
 *     description: Admins and moderators can create new medical checkup record.
 *     tags: [MedicalCheckup]
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
 *               checkupDate:
 *                 type: string
 *                 format: date
 *               illness:
 *                 type: string
 *             example:
 *               checkupDate: '12/12/2023'
 *               illness: cough
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
 *                   example: Medical checkup record created successfully
 *                 cow:
 *                   $ref: '#/components/schemas/MedicalCheckup'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
router.route('/:cowId/medical-checkup').get(getMedicalCheckups).post(createMedicalCheckup);

/**
 * @swagger
 * /cows/{cowId}/medical-checkup/{id}:
 *   get:
 *     summary: Get a medical checkup record
 *     description: Admins and moderators can fetch a medical checkup record by id.
 *     tags: [MedicalCheckup]
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
 *         description: Medical checkup id
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
 *                   example: Medical checkup record retrieved successfully
 *                 cow:
 *                   $ref: '#/components/schemas/MedicalCheckup'
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
 *                   example: There is no medical checkup record with this id
 *
 *   put:
 *     summary: Update a medical checkup record
 *     description: Admins and moderators can update a medical checkup record by id.
 *     tags: [MedicalCheckup]
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
 *         description: Medical checkup id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               checkupDate:
 *                 type: string
 *                 format: date
 *               breed:
 *                 type: string
 *                 enum: [Holstein, Montbéliarde]
 *             example:
 *               checkupDate: '12/12/2023'
 *               illness: Respiratory infection
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
 *                   example: Medical checkup record updated successfully
 *                 cow:
 *                   $ref: '#/components/schemas/MedicalCheckup'
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
 *                   example: There is no medical checkup record with this id
 *   delete:
 *     summary: Delete a medical checkup record
 *     description: Admins and moderators can delete medical checkup records.
 *     tags: [MedicalCheckup]
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
 *         description: Medical checkup id
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
 *                   example: medical checkup record deleted successfully
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
 *                   example: There is no medical checkup record with this id
 */
router
  .route('/:cowId/medical-checkup/:id')
  .get(getMedicalCheckup)
  .put(updateMedicalCheckup)
  .delete(deleteMedicalCheckup);

module.exports = router;
