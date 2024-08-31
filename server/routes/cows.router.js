const router = require('express').Router();
const {
  getCows,
  getCow,
  createCow,
  updateCow,
  deleteCow,
} = require('../controllers/cows.controller');
const {
  getBirths,
  getBirth,
  createBirth,
  updateBirth,
  deleteBirth,
} = require('../controllers/births.controller');
const {
  createMedicalCheckup,
  getMedicalCheckups,
  getMedicalCheckup,
  updateMedicalCheckup,
  deleteMedicalCheckup,
} = require('../controllers/medical-checkups.controller');

// Cows Section
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

// Births Section
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
router
  .route('/:cowId/births/:id')
  .get(getBirth)
  .put(updateBirth)
  .delete(deleteBirth);

// Medical Checkups Section
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
router
  .route('/:cowId/medical-checkups')
  .get(getMedicalCheckups)
  .post(createMedicalCheckup);

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
  .route('/:cowId/medical-checkups/:id')
  .get(getMedicalCheckup)
  .put(updateMedicalCheckup)
  .delete(deleteMedicalCheckup);

module.exports = router;
