export interface IRegister {
  name: string;
  email: string;
  password: string;
  role: "TENANT" | "LANDLORD";
}

export interface ILogin {
  email: string;
  password: string;
}
