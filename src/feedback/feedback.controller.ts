import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { ListFeedbackQueryDto } from './dto/list-feedback-query.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  /**
   * Submits new feedback or returns an existing deduplicated record.
   * @param body - Feedback submission payload
   * @param response - Express response for status code selection
   * @returns Feedback record with analysis summary when available
   */
  @Post()
  async create(
    @Body() body: CreateFeedbackDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.feedbackService.submitFeedback(body.content);
    const statusCode = result.isNew ? HttpStatus.CREATED : HttpStatus.OK;
    response.status(statusCode);
    return result.feedback;
  }

  /**
   * Lists feedback with pagination and optional status filter.
   * @param query - List query parameters
   * @returns Paginated feedback collection
   */
  @Get()
  list(@Query() query: ListFeedbackQueryDto) {
    return this.feedbackService.listFeedback(query);
  }

  /**
   * Returns a single feedback item by id.
   * @param id - Feedback primary key
   * @returns Feedback with latest analysis
   */
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.feedbackService.getFeedbackById(id);
  }

  /**
   * Manually retries AI analysis for failed feedback.
   * @param id - Feedback primary key
   * @returns Updated feedback record
   */
  @Post(':id/retry')
  @HttpCode(HttpStatus.OK)
  retry(@Param('id') id: string) {
    return this.feedbackService.retryFeedback(id);
  }
}
