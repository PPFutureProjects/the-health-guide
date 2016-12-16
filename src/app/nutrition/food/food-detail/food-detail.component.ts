import { ChangeDetectorRef, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Food } from '../shared/food.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss']
})
export class FoodDetailComponent implements OnInit {
  public aminoacids: string[] = [];
  public basicNutrients: string[] = [];
  public minerals: string[] = [];
  public food: Food;
  public vitamins: string[] = [];
  constructor(
    private detector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private titleSvc: Title
  ) {
    this.basicNutrients = [
      "Water",
      "Protein",
      "Carbohydrates",
      "Sugars",
      "Fiber",
      "Fats",
      "Saturated fat",
      "Monounsaturated fat",
      "Polyunsaturated fat",
      "Trans fat"
    ];
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { food: Food }) => {
      if (!!data) {
        this.food = Object.assign({}, data.food);
        this.aminoacids = Object.keys(this.food['amino acids']);
        this.vitamins = Object.keys(this.food['vitamins']);
        this.minerals = Object.keys(this.food['minerals']);
        this.titleSvc.setTitle(this.food.name);
        this.detector.markForCheck();
      }
    });
  }

}
