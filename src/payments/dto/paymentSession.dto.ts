import { ArrayMinSize, IsArray, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class PaymentSessionDto {
    @IsString()
    currency: string;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => PaymentSessionItemDto)
    items: PaymentSessionItemDto[];
}

export class PaymentSessionItemDto {
    @IsString()
    name: string;

    @IsString()
    @IsPositive()
    price: string;

    @IsString()
    quantity: number;
}