import { Injectable } from '@nestjs/common';
import { Restaurant } from '../models/restaurant';
import { RestaurantsService } from '../restaurants/restaurants.service';
<<<<<<< HEAD
import { FilterService } from 'src/filter/filter.service';
=======
>>>>>>> master

@Injectable()
export class SearchService {

<<<<<<< HEAD
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

    public async expandingSquaresearch (originLat: number, originLon: number, distanceMod: number, cuisines: string, priceRange: number): Promise<Restaurant[]>  { 
        
        let allRestaurants: Restaurant[] = [];
        let searching: boolean = true;
        let searchEnd: number = 2;

        // Set delta lon for current latitude
        this.deltaLon = this.twoKmLon(originLat);


        let coord: number[] = [2]; 
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
        
=======
    constructor(private restaurantsService: RestaurantsService){}

    protected lengthOneDegreeLat: number = 111.320;
    protected deltaLat: number = 2*0.009;
    protected deltaLon: number = 0; 

    protected restaurantsMap:Map<number, Restaurant> = new Map();

    public async expandingSquaresearch (originLat: number, originLon: number, distanceMod: number): Promise<Restaurant[]>  { 
        
        let allRestaurants: Restaurant[] = [];

        let iterations: number = distanceMod/2 - 1;
        let searchCount: number = 0;

        let newLatN: number = originLat;
        let newLatS: number = originLat;
        let newLonE: number = originLon;
        let newLonW: number = originLon;

        // Set delta lon for current latitude
        this.deltaLon = this.twoKmLon(originLat);
    
        // Get initial restaurants around origin
        this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, originLon));

        while(searchCount < iterations){
            //Find delta lon and lat
            newLatN = newLatN - -this.deltaLat;
            newLatS = newLatS - this.deltaLat;
            newLonE = newLonE - -this.deltaLon;
            newLonW = newLonW - this.deltaLon;
            searchCount++;

            // Get restaurants slightly north, south, east and west of user location and check for duplicates 
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatN, originLon));
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(newLatS, originLon));
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonE));
            this.catchDuplicates(await this.restaurantsService.getRestaurantsForLocation(originLat, newLonW));
        }
>>>>>>> master
        // Convert map to an array to return
        for (let key of this.restaurantsMap.keys()){
            allRestaurants.push(<Restaurant>this.restaurantsMap.get(key));
        }
        return allRestaurants; 
    }

<<<<<<< HEAD
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
=======
    private catchDuplicates(restaurants: Restaurant[]): void {
        restaurants.forEach(restaurant => {
            if(!(this.restaurantsMap.has(restaurant.id))){
                this.restaurantsMap.set(restaurant.id, restaurant);
            } 
        });
>>>>>>> master
    }

    private twoKmLon(lat: number): number {
        let oneDegreeLonInKm = this.lengthOneDegreeLat*Math.cos(this.toRadians(lat));
        return 2*(1/oneDegreeLonInKm);
    }

    private toRadians(deg: number): number {
        return deg * (Math.PI/180);
    }
<<<<<<< HEAD
=======

>>>>>>> master
}