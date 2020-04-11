import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CuisinesService {

    constructor() {}

    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };
    
    getCuisines(cityID: number, lat: number, lon: number) {

        return axios({method: 'GET', url: `${this.baseAddress}/cuisines?city_id=${cityID}&lat=${lat}&lon=${lon}`, headers: this.headersRequest})
        .then(res => res.data)
        .catch(err => console.log(err));

    }

    getCategories() {
        return axios({method: 'GET', url: `${this.baseAddress}/categories`, headers: this.headersRequest})
        .then(res => res.data)
        .catch(err => console.log(err));
    }
}
