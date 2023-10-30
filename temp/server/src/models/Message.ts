import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { Chat } from './Chat';

@Entity('messages')
export class Message {
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'chat_id' })
  @ManyToOne(() => Chat)
  chat: Chat;

  @Column()
  chat_id: string;

  @Column()
  sender_id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
