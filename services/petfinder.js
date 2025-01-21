const axios = require('axios');
require('dotenv').config();

class PetfinderService {
    constructor() {
        this.apiKey = process.env.PETFINDER_API_KEY;
        this.apiSecret = process.env.PETFINDER_API_SECRET;
        this.baseURL = 'https://api.petfinder.com/v2';
        this.token = null;
    }

    async authenticate() {
        try {
            const response = await axios.post('https://api.petfinder.com/v2/oauth2/token', {
                grant_type: 'client_credentials',
                client_id: this.apiKey,
                client_secret: this.apiSecret
            });
            this.token = response.data.access_token;
            return this.token;
        } catch (error) {
            console.error('Authentication error:', error.message);
            throw error;
        }
    }

    async getHeaders() {
        if (!this.token) {
            await this.authenticate();
        }
        return {
            Authorization: `Bearer ${this.token}`
        };
    }

    async getPets(params = {}) {
        try {
            const headers = await this.getHeaders();
            const response = await axios.get(`${this.baseURL}/animals`, {
                headers,
                params
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                // Token expired, reauthenticate and retry
                await this.authenticate();
                return this.getPets(params);
            }
            throw error;
        }
    }

    async getPetById(id) {
        try {
            const headers = await this.getHeaders();
            const response = await axios.get(`${this.baseURL}/animals/${id}`, {
                headers
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                await this.authenticate();
                return this.getPetById(id);
            }
            throw error;
        }
    }

    async getTypes() {
        try {
            const headers = await this.getHeaders();
            const response = await axios.get(`${this.baseURL}/types`, {
                headers
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                await this.authenticate();
                return this.getTypes();
            }
            throw error;
        }
    }
}

module.exports = new PetfinderService();