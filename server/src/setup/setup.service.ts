import { Injectable } from '@nestjs/common';
import { Interaction } from 'src/models/interaction';

@Injectable()
export class SetupService {
  createNewInteraction(cuisines: string[], priceRange: number, lat: number, lon: number) : Interaction {
      let interaction : Interaction = new Interaction;
      interaction.id = this.generateSessionCode();
      interaction.cuisines = cuisines;
      interaction.priceRange = priceRange;
      interaction.lat = lat;
      interaction.lon = lon;
      console.log(interaction);
      return interaction;
  }

  generateSessionCode(): string {
      let code: string = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
      return code;
  }



}
