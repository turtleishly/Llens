/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REGISTRATION_SHEETS_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
