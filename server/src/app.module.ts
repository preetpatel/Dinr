import { Module, HttpService, HttpModule  } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistanceService } from './distance/distance.service';
import { DistanceController } from './distance/distance.controller';
import { RestaurantsService } from './restaurants/restaurants.service';
import { SearchService } from './search/search.service';
import { FilterService } from './filter/filter.service';
import { SetupService } from './setup/setup.service';


@Module({
  imports: [ HttpModule ],
  controllers: [AppController, DistanceController],
  providers: [AppService, DistanceService, RestaurantsService, SearchService, FilterService, SetupService],
})
export class AppModule {}
