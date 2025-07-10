import { Module } from '@nestjs/common';
import { CodeGeneratorService } from './code-generator.service';

@Module({
  providers: [
    {
      provide: 'ICodeGenerator',
      useClass: CodeGeneratorService,
    },
  ],
  exports: ['ICodeGenerator'],
})
export class CodeGeneratorModule {}
