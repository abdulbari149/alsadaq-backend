import { str, num } from 'envalid';
import appConfig from './app.config';
import { Environments } from '@/enums/environment.enum';

const envValidationConfig = {
  NODE_ENV: str({
    default: Environments.DEV,
    choices: [...Object.values(Environments)],
  }),
  PORT: num({ default: appConfig.defaultPort }),
  APP_BASE_URL: str(),
  DATABASE_URL: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_ACCESS_EXPIRATION: str(),
  JWT_REFRESH_SECRET: str(),
  JWT_REFRESH_EXPIRATION: str(),
  SUPERADMIN_FIRST_NAME: str(),
  SUPERADMIN_LAST_NAME: str(),
  SUPERADMIN_EMAIL: str(),
  SUPERADMIN_PHONE: str(),
  SUPERADMIN_PASSWORD: str(),
  EMAIL_HOST: str(),
  EMAIL_PORT: num(),
  EMAIL_USER: str(),
  EMAIL_PASSWORD: str(),
  EMAIL_FROM: str(),
};

export default envValidationConfig;
