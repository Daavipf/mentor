declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENEM_API_URL: string;
      DATABASE_URL: string;
    }
  }
}

export {};
