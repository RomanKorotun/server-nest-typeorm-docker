import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Unique('user_email_verifications_user_id_uq', ['userId'])
@Entity({ name: 'user_email_verifications' })
export class UserEmailVerificationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_email_confirmed', type: 'boolean', default: false })
  isEmailConfirmed: boolean;

  @Column({
    name: 'email_verification_code',
    type: 'varchar',
    length: 65,
    nullable: true,
  })
  emailVerificationCode: string | null;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.emailVerification, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
