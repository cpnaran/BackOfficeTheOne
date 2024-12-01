export interface ErrorState {
  code: string | null;
  message: string | null;
  url: string | null;
}

export const initialState: ErrorState = {
  code: null,
  message: null,
  url: null,
};
