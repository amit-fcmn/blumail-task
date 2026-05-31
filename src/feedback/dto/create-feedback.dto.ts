import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { MAX_CONTENT_LENGTH } from '../../common/constants/feedback.constants';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_CONTENT_LENGTH)
  content: string;
}
