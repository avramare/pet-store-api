const express = require('express');
const router = express.Router();
const petfinder = require('../services/petfinder');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pet:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Pet ID
 *         name:
 *           type: string
 *           description: Pet name
 *         type:
 *           type: string
 *           description: Animal type
 *         breeds:
 *           type: object
 *           properties:
 *             primary:
 *               type: string
 *             secondary:
 *               type: string
 *             mixed:
 *               type: boolean
 *         age:
 *           type: string
 *         gender:
 *           type: string
 *         size:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Returns pets from Petfinder
 *     tags: [Pets]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Animal type (e.g., dog, cat)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of pets
 */
router.get('/pets', async (req, res) => {
    try {
        const params = {
            type: req.query.type,
            page: req.query.page || 1,
            limit: 20
        };
        const pets = await petfinder.getPets(params);
        res.json(pets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/pets/{id}:
 *   get:
 *     summary: Get a pet by ID from Petfinder
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
 */
router.get('/pets/:id', async (req, res) => {
    try {
        const pet = await petfinder.getPetById(req.params.id);
        res.json(pet);
    } catch (error) {
        if (error.response?.status === 404) {
            res.status(404).json({ message: 'Pet not found' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

/**
 * @swagger
 * /api/types:
 *   get:
 *     summary: Get all animal types from Petfinder
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: List of animal types
 */
router.get('/types', async (req, res) => {
    try {
        const types = await petfinder.getTypes();
        res.json(types);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;