import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  /**
   * Хеширует пароль
   * @param password - Пароль в открытом виде
   * @returns Захешированный пароль
   */
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Сравнивает пароль с хешем
   * @param password - Пароль в открытом виде
   * @param hash - Захешированный пароль
   * @returns true, если пароль совпадает
   */
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
