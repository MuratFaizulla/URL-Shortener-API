import { createClient } from 'redis';

export const client = createClient({
    url: 'redis://localhost:6379'
});

export const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        throw err;
    }
};
