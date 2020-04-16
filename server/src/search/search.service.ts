import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {

    constructor(){}

    protected lengthOneDegreeLat: number = 111000;
    protected thousandMInLat = 0.009; 

    expandingSquaresearch(originLat: number, originLon: number, distanceMod: number){
        let searchIteration: number = 0;
        while(searchIteration < distanceMod){
            
        }



    }

    oneKmLon(lat: number){
        let oneDegreeLonInM = Math.cos(this.toRadians(lat))*this.lengthOneDegreeLat;
        return 1/oneDegreeLonInM;
    }

    toRadians(deg: number) {
        return deg * (Math.PI/180);
    }





}
