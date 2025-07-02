import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MovieApp API')
  .setDescription(
    'API для реєстрації користувачів і керування фільмами. Зареєстровані користувачі можуть додавати та переглядати фільми.',
  )
  .setVersion('0.0.1')
  .setContact(
    'Roman Korotun',
    'https://github.com/RomanKorotun/server-nest-typeorm-docker',
    'roman.korotun@ukr.net',
  )
  .build();
