import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  /**
   * Returns service liveness status.
   * @returns Health payload
   */
  @Get()
  check() {
    return { status: 'ok' };
  }
}
