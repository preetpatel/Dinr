import { Injectable, HttpService  } from '@nestjs/common';
import axios from 'axios';


@Injectable()
export class RestaurantService {

    constructor() {}

    protected baseAddress: string = "https://developers.zomato.com/api/v2.1";

    protected headersRequest = {
        'user-key': '98334e87fff8e40beb83e1609e380766'
    };

    getRestaurant(id: number) {

        return axios({method: 'GET', url: `${this.baseAddress}/restaurant?res_id=${id}`, headers: this.headersRequest})
        .then(res => res.data)
        .catch(err => console.log(err));

    }



}
