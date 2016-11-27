import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { Food } from '../shared/food.model';
import { FoodService } from '../shared/food.service';

@Injectable()
export class FoodDetailResolve implements Resolve<Food> {
  private food: Food;
  constructor(private foodSvc: FoodService, private router: Router) { }

  public resolve(route: ActivatedRouteSnapshot): Promise<Food> {
    let foodKey: string | number = route.params['key'];
    return new Promise((resolve, reject) => {
      this.foodSvc.getFood(foodKey).subscribe((data: Food) => {
        if (!!data) {
          this.food = Object.assign({}, data);
        }
      });
      setTimeout(() => {
        if (!this.food) {
          this.router.navigate(['food']);
        } else {
          resolve(this.food);
        }
      }, 1000);
    });
  }

}