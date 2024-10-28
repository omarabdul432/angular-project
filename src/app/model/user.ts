export interface User {
  email: string;
  password: string;
  
}

export interface CurrentUser{
  idToken:string,
  email:string,
  refreshToken:string,
  expiresIn:string
}
