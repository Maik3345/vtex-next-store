export interface UserType {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  vtexAccountName: string | null;
}
