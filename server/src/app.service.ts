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
    await this.getRestaurantData(interaction.id)
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

  getReadyToSwipeStatus(id: string) {
    return this.interactions.get(id).clientsReadyToSwipe === this.interactions.get(id).peopleJoined;
  }

  addClientReadyToSwipe(id: string) {
    return this.interactions.get(id).clientsReadyToSwipe += 1;
  }

  addSwipeDataToInteraction(id: string, responses: number[]) {
    const interaction = this.interactions.get(id);
    for (let i in responses) {
      interaction.allRestaurants[i].vote += responses[i];
    }
    interaction.peopleJoined -= 1;

    // If everyone has submitted, calculate the final scores
    if (interaction.peopleJoined === 0) {
      interaction.allRestaurants.sort((a,b) => (a.vote > b.vote) ? -1 : 1);
      if (interaction.allRestaurants.length < 4) {
        interaction.topThreeRestaurants = interaction.allRestaurants;
        return;
      }
      interaction.topThreeRestaurants = new Array<Restaurant>()
      for (let i = 0; i < 3; i++) {
        interaction.topThreeRestaurants[i] = interaction.allRestaurants[i];
      }
    }
  }

  getFinalResults(id: string) {
    const interaction = this.interactions.get(id);
    return interaction.topThreeRestaurants;
  }

}
