import { IsEmail, IsString, IsInt, Min, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreateProfileDto {
  @IsEmail()
  email: string;

  @IsString()
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @Length(2, 50)
  displayName: string;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  age: number;
}