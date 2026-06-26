import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health/live')
  live(@Res() res: Response): void {
    res.status(200).json({ status: 'ok' });
  }

  @Get('health')
  async health(@Res() res: Response): Promise<void> {
    const result = await this.healthService.check();
    const statusCode = result.status === 'ok' ? 200 : 503;
    res.status(statusCode).json(result);
  }
}
