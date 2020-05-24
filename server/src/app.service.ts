import { Injectable } from '@nestjs/common';
import { DistanceService } from './distance/distance.service';
import { Restaurant } from './models/restaurant';
import { SearchService } from './search/search.service';
import { SetupService } from './setup/setup.service';
import { Interaction } from './models/interaction';


@Injectable()
export class AppService {
  constructor(
    private distanceService: DistanceService,
    private searchService: SearchService,
    private setupService: SetupService,
    ) {}

  originalLat: number;
  originalLon: number;
  allRestaurants: Restaurant[];


  private interactions = new Map<string, Interaction>();

  async getRestaurants(lat: number, lon: number,
    cuisines: string): Promise<Restaurant[]> {
      this.originalLat = lat;
      this.originalLon = lon;

      // Search given distance modifier
      this.allRestaurants = await this.searchService.expandingSquaresearch(lat, lon, cuisines);

      // Get distances for each restaurant that we've gotten back
      this.allRestaurants = await this.getDistancesForRestaurants(this.allRestaurants);

      return this.allRestaurants;
  }

  async getDistancesForRestaurants(restaurants: Restaurant[]): Promise<Restaurant[]> {
    for (let restaurant of restaurants){
      restaurant.distance = await this.distanceService.getDistance(this.originalLat, this.originalLon, restaurant.latitude, restaurant.longitude);
    }
    return restaurants;
  }

  async setupInteraction(lat: number, lon: number, cuisines: string[], priceLevel: number) {
    // Create new interaction
    let interaction: Interaction = this.setupService.createNewInteraction(cuisines, priceLevel, lat, lon);
    this.interactions.set(interaction.id, interaction);
    return interaction;
  }

  async getRestaurantData(interactionID: string) {
    const interaction: Interaction = this.interactions.get(interactionID);
    if (interaction.allRestaurants.length == 0) {
      let allRestaurants = await this.getRestaurants(interaction.lat,interaction.lon,interaction.cuisines.toString())
      interaction.allRestaurants.push(...allRestaurants)
    }
    return interaction.allRestaurants;
  }

  getInteraction(id: string) {
    if (!this.interactions.has(id)) {
      return;
    }
    return this.interactions.get(id);
  }

  async getFriendCount(id: string) {
    return this.interactions.get(id).peopleJoined;
  }

  increaseFriendCount(id: string) {
    this.interactions.get(id).peopleJoined += 1;
  }

  startMatch(id: string) {
    this.interactions.get(id).matchingStarted = true;
  }

  getMatchStatus(id: string) {
    return this.interactions.get(id).matchingStarted;
  }

}
