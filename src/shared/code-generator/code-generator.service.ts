import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { ICodeGenerator } from './code-generator.interface';

@Injectable()
export class CodeGeneratorService implements ICodeGenerator {
  generate(): string {
    return nanoid();
  }
}
