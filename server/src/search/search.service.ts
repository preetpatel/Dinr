import { Injectable } from '@nestjs/common';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { FilterService } from '../filter/filter.service';

@Injectable()
export class SearchService {

    constructor(
        private restaurantsService: RestaurantsService,
        private filterService: FilterService
    ){}

    protected maxSearch: number = 10;
    protected maxRestaurants: number = 12;
    protected lengthOneDegreeLat: number = 111.320;
    protected deltaLat: number = 2*0.009;
    protected deltaLon: number = 0; 
    protected coordsSearched = [];


    protected restaurantsMap:Map<number, Restaurant> = new Map();

    public async expandingSquaresearch (originLat: number, originLon: number, cuisines: string, priceRange: number): Promise<Restaurant[]>  { 
        
        let allRestaurants: Restaurant[] = [];
        let searching: boolean = true;
        let searchEnd: number = 2;

        // Set delta lon for current latitude
        this.deltaLon = this.twoKmLon(originLat);

        while(searching){
            for(let x = 0; x < searchEnd; x++){
                for(let y = 0; y < searchEnd; y++){
                    //Check if coords have been queried before
                    if(!this.checkCoords(x,y)){
                        this.coordsSearched.push([x,y]);

                        // Get restaurants and check if this list has been filled
                        if(this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat + x*this.deltaLat, originLon + y*this.deltaLon), cuisines, priceRange)){
                          searching = false;
                          break;
                        } else if(this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat - x*this.deltaLat, originLon - y*this.deltaLon), cuisines, priceRange)){
                          searching = false;
                          break;
                        } else if(this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat + x*this.deltaLat, originLon - y*this.deltaLon), cuisines, priceRange)){
                          searching = false;
                          break;
                        } else if (this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat - x*this.deltaLat, originLon + y*this.deltaLon), cuisines, priceRange)){
                          searching = false;
                          break;
                        }
                    } 
                }               
                if(!searching){
                    break;
                }
            }
            if(searchEnd === this.maxSearch){
                searching = false;
                //TODO Return message saying not enough restaurants were found
            }
            searchEnd++;
        }
        
        // Convert map to an array to return
        for (let key of this.restaurantsMap.keys()){
            allRestaurants.push(<Restaurant>this.restaurantsMap.get(key));
        }
        return allRestaurants; 
    }

    private catchDuplicates(restaurants: Restaurant[], cuisines: string, priceRange: number): boolean {
        let listFull: boolean = false;
        if(restaurants !== null){
            restaurants.forEach(restaurant => {
                if(!(this.restaurantsMap.has(restaurant.id))){
                    if(this.filterService.checkRestaurant(restaurant, cuisines, priceRange)){
                        this.restaurantsMap.set(restaurant.id, restaurant);
                        if(this.restaurantsMap.size == this.maxRestaurants){
                            listFull = true;
                        }
                    }
                } 
            });
        }
        return listFull;
    }

    private checkCoords(x: number, y: number): boolean{
        let isSearched: boolean = false;
        for(let searched of this.coordsSearched){
            if(searched[0] === x && searched[1] === y){
                isSearched = true;
                break;
            }
        }
        return isSearched;
    }

    private twoKmLon(lat: number): number {
        let oneDegreeLonInKm = this.lengthOneDegreeLat*Math.cos(this.toRadians(lat));
        return 2*(1/oneDegreeLonInKm);
    }

    private toRadians(deg: number): number {
        return deg * (Math.PI/180);
    }
}