import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {

  public send(email: string, bodyData: any): Promise<any> {
    return Promise.resolve({ email, bodyData });
  }
}
