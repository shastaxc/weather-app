import { env } from '@/environments/environment';

const BACKEND_SERVER_ADDRESS = env.API_URL;

export class Routes {
  public static API_ROUTE = `${BACKEND_SERVER_ADDRESS}/api`;
}
