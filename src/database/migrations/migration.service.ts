import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryRepository } from '../query.repository';

@Injectable()
export class MigrationService {
  constructor(private readonly queryRepo: QueryRepository) {}

  async runSeeds(query: string): Promise<void> {
    try {
      await this.queryRepo.initQuery().raw(query).run();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
