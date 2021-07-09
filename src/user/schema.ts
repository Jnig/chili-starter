interface User{
  name: string;
  email: string;
}

export interface CreateUser extends User{}
export interface UpdateUser extends Partial<User> {}
export interface UserResponse extends User {
    id: number
}