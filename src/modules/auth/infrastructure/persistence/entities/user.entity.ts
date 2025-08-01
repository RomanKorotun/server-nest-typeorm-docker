import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEmailVerificationEntity } from './user-email-verification.entity';
import { Role } from '../../../../../common/enums/role.enum';

@Unique('users_email_uq', ['email'])
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', type: 'varchar', length: 250 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 250 })
  lastName: string;

  @Column({ type: 'varchar', length: 125 })
  email: string;

  @Column({ type: 'varchar', length: 125 })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @OneToOne(
    () => UserEmailVerificationEntity,
    (verification) => verification.user,
  )
  emailVerification: UserEmailVerificationEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
