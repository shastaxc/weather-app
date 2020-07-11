import { env } from '@/environments/environment';

const BACKEND_SERVER_ADDRESS = env.API_URL;
export const API_ROUTE = `${BACKEND_SERVER_ADDRESS}/api`;
