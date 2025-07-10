import { Injectable } from '@nestjs/common';
import { ICodeGenerator } from './code-generator.interface';
import { nanoid } from 'nanoid';

@Injectable()
export class CodeGeneratorService implements ICodeGenerator {
  generate(): string {
    return nanoid();
  }
}
