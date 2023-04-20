export type LocaleType = 'en' | 'ru';

export type ErrorReponse = {
  data?: string;
  error?: {
    message?: string;
    stack?: string;
  };
  internal?: boolean;
  status?: number;
  statusText?: string;
};

declare global {
  interface Window {
    initialState?: StoreData;
  }
}
