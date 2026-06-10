import { BaseEntity } from "../BaseEntity";

export interface User extends BaseEntity {
  email: string;
  name: string;
  password: string;
}
