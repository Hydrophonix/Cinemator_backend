// Core
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';

// App
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const configService = app.get(ConfigService);
    const port = configService.get('PORT') ?? 4000;

    app.set('trust proxy', 1);
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
        origin: [
            'http://localhost',
            'http://localhost:80',
            'http://localhost:3000', // dev
            'http://localhost:5000', // serve
            'http://10.0.1.13:5000', // serve
            'http://192.168.99.100', // w10 docker
            'http://46.101.215.145', // prod
            'http://cinemator.pp.ua', // prod
        ],
        credentials: true,
    });

    await app.listen(port);

    Logger.log(`🚀 Server running on http://localhost:${port}`, 'NestApplication');
    Logger.log(`🚀 Graphql playground running on http://localhost:${port}/graphql`, 'ApolloServer');
}

bootstrap();
