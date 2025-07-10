import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { IPasswordHash } from '../contracts/password-hasher.interface';

@Injectable()
export class PasswordHashService implements IPasswordHash {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password);
  }
}
