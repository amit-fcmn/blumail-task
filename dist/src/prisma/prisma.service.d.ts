import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../config/app-config.interface';
import { PrismaClient } from '../generated/prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly configService;
    private readonly pool;
    constructor(configService: ConfigService<AppConfig, true>);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
