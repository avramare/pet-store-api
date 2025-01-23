const express = require('express');
const router = express.Router();
const petfinder = require('../services/petfinder');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the pet
 *         name:
 *           type: string
 *           description: The name of the pet
 *         status:
 *           type: string
 *           description: Pet status in the store
 *           enum: [available, pending, sold]
 *         category:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
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
    // Temporary mock response until database is connected
    res.json([
        {
            id: 1,
            name: "Max",
            status: "available",
            category: {
                id: 1,
                name: "Dogs"
            }
        }
    ]);
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
    const newPet = req.body;
    // Temporary mock response until database is connected
    res.status(201).json({
        id: 2,
        ...newPet
    });
});

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Get a pet by ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
    // Temporary mock response until database is connected
    res.json({
        id: req.params.id,
        name: "Max",
        status: "available",
        category: {
            id: 1,
            name: "Dogs"
        }
    });
});

/**
 * @swagger
 * /api/pets/{id}:
 *   put:
 *     summary: Update a pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pet'
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *       404:
 *         description: Pet not found
 */
router.put('/pets/:id', (req, res) => {
    const updatedPet = req.body;
    // Temporary mock response until database is connected
    res.json({
        id: req.params.id,
        ...updatedPet
    });
});

/**
 * @swagger
 * /api/pets/{id}:
 *   delete:
 *     summary: Delete a pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Pet deleted successfully
 *       404:
 *         description: Pet not found
 */
router.delete('/pets/:id', (req, res) => {
    // Temporary mock response until database is connected
    res.status(204).send();
});

module.exports = router;