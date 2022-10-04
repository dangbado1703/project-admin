import { IFormLogin } from "./Login.model";

export interface IFormRegister extends IFormLogin {
  phone: string;
  fullName: string;
  email: string;
}
