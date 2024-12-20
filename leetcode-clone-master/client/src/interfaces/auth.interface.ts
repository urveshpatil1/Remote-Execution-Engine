export type SignInType = {
  email: string;
  password: string;
};

export interface SignUpType {
  name: string;
  email: string;
  password: string;
}

export interface SignUpTypeForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
