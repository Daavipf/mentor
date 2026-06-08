declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENEM_API_URL: string;
      DATABASE_URL: string;
      POSTGRES_URL: string;
      IMAGE_PATH_TEMPLATE: string;
    }
  }
}

export {};
