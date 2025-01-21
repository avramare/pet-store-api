const express = require('express');
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - species
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         name:
 *           type: string
 *           description: Pet name
 *         species:
 *           type: string
 *           description: Pet species
 *         age:
 *           type: integer
 *           description: Pet age
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Returns all pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pet'
 */
router.get('/pets', (req, res) => {
    res.json([]);
});

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Create a new pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       201:
 *         description: Pet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 */
router.post('/pets', (req, res) => {
    res.status(201).json(req.body);
});

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Get a pet by id
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Pet id
 *     responses:
 *       200:
 *         description: Pet details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pet'
 *       404:
 *         description: Pet not found
 */
router.get('/pets/:id', (req, res) => {
    res.json({});
});

module.exports = router;