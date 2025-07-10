export interface IPasswordHash {
  hash(password: string): Promise<string>;
}
