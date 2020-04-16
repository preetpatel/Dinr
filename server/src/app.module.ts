import { Module, HttpService, HttpModule  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantService } from './restaurant/restaurant.service';
import { RestaurantController } from './restaurant/restaurant.controller';
import { CuisinesService } from './cuisines/cuisines.service';
import { CuisinesController } from './cuisines/cuisines.controller';
import { DistanceService } from './distance/distance.service';
import { DistanceController } from './distance/distance.controller';
import { RestaurantsService } from './restaurants/restaurants.service';
import { RestaurantsController } from './restaurants/restaurants.controller';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { FilterService } from './filter/filter.service';


@Module({
  imports: [ HttpModule ],
  controllers: [AppController, RestaurantController, CuisinesController, DistanceController, RestaurantsController, SearchController],
  providers: [AppService, RestaurantService, CuisinesService, DistanceService, RestaurantsService, SearchService, FilterService],
})
export class AppModule {}
