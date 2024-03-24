import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('events')
export class EventsController {
  @Get('stream')
  stream(@Res() res: Response) {
    console.log('first stream');
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    res.on('close', () => {
      // Clean up when the client closes the connection
      console.log('Connection closed');
      clearInterval(interval);
    });

    const interval = setInterval(() => {
      // Send periodic messages to the client
      res.write(
        `data: ${JSON.stringify({ message: 'Server Time: ' + new Date() })}\n\n`,
      );
      console.log('Second');
    }, 1000);
  }
}
