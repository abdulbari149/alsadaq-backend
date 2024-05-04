import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateBoycottProductDto {
  @IsString()
  @IsNotEmpty()
  boycottName: string;

  @IsString()
  @IsNotEmpty()
  boycottImage: string;

  @IsString()
  @IsNotEmpty()
  alternateName: string;

  @IsString()
  @IsNotEmpty()
  alternateImage: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}

export class CreateBoycottProductBulkDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => CreateBoycottProductDto)
  @ValidateNested({
    each: true,
  })
  @ArrayNotEmpty()
  products: CreateBoycottProductDto[];
}

export class ListBoycottProductsQueryDto {
  @IsString()
  @IsOptional()
  category?: string;
}
