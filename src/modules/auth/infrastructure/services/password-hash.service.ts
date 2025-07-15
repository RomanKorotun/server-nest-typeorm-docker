import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { IPasswordHashService } from '../../application/contracts/password-hash-service.interface';

@Injectable()
export class PasswordHashService implements IPasswordHashService {
  async hash(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async verify(passwordHash: string, password: string): Promise<boolean> {
    return await argon2.verify(passwordHash, password);
  }
}
