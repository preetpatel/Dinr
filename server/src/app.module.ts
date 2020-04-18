import { Module, HttpService, HttpModule  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { CuisinesService } from './cuisines/cuisines.service';
import { CuisinesController } from './cuisines/cuisines.controller';

@Module({
  imports: [ HttpModule ],
  controllers: [AppController, RestaurantController, CuisinesController],
  providers: [AppService, RestaurantService, CuisinesService],
})
export class AppModule {}
