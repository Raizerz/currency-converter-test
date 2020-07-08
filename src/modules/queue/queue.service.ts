import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { EventEmitter } from 'events';
import { Message, Squiss } from 'squiss-ts';
import { ACCESS_KEY_ID, ENDPOINT, EVENT_TYPE, REGION, SECRET_ACCESS_KEY  } from './queue.constant';

@Injectable()
export class QueueService implements OnApplicationBootstrap {
  squiss: Squiss;
  emitter: EventEmitter = new EventEmitter();

  constructor() {
    this.squiss = new Squiss({
      awsConfig: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
        region: REGION,
      },
      queueName: ENDPOINT,
      bodyFormat: 'json',
      maxInFlight: 10,
    });
  }

  onApplicationBootstrap(): void {
    this.squiss.on('message', (message: Message) => {
      this.handleMessage(message.body);
      message.del();
    });
    this.squiss.start();
  }

  private handleMessage = (body: any) => {
    const type = EVENT_TYPE[body.type];
    this.emitter.emit(EVENT_TYPE[type], body);
  }

  public sendMessage = (type: EVENT_TYPE, bodyData: any): void => {
    const body = {
      type,
      data: bodyData,
    };
    this.squiss.sendMessage(body, 0);
  }

}
