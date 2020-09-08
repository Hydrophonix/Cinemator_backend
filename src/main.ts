// Core
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// App
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') ?? 4000;

    app.set('trust proxy', 1);
    app.use(rateLimit({
        windowMs: 60 * 1000, // 1 minutes
        max:      120, // limit each IP to 120 requests per windowMs
    }));
    app.use(helmet());
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: [
            'http://localhost',
            'http://localhost:3000', // dev
            'http://localhost:5000', // serve
            'http://localhost:5500', // live-server
            'http://192.168.99.100', // w10 docker
            'https://cinemator.pp.ua', // prod
        ],
        credentials: true,
    });

    await app.listen(port);

    Logger.log(`🚀 Server running on http://localhost:${port}`, 'NestApplication');
    Logger.log(`🚀 Graphql playground running on http://localhost:${port}/graphql`, 'ApolloServer');
}

bootstrap();
