export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "viewer";
  createdAt: string;
};

export type CreateUserInput = {
  name: string;
  email: string;
  role: User["role"];
};
