// App
import { ChangeDetectorRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { Alert, AlertController, InfiniteScroll, ViewController } from 'ionic-angular';

// Third-party
import { FirebaseListObservable } from 'angularfire2';

// Models
import { Activity } from '../../models';

// Providers
import { ActivityService } from '../../providers';


@Component({
  selector: 'page-activity-select',
  templateUrl: 'activity-select.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivitySelectPage {
  public activities: FirebaseListObservable<Array<Activity>>;
  public limit: number = 50;
  public searchQuery: string = '';
  public selectedActivity: Activity;
  public selectedActivityName: string;
  constructor(
    private _activitySvc: ActivityService,
    private _alertCtrl: AlertController,
    private _detectorRef: ChangeDetectorRef,
    private _viewCtrl: ViewController
  ) { }

  public clearSearch(ev): void {
    this.searchQuery = '';
  }

  public doneSelecting(): void {
    this._viewCtrl.dismiss(this.selectedActivity);
  }

  public loadMore(ev: InfiniteScroll) {
    this.limit += 50;
    setTimeout(() => {
      //this._activitySvc.changeActivityQueryLimit(this.limit);
      ev.complete();
      this._detectorRef.markForCheck();
    }, 1000);
  }

  public selectActivity(activity: Activity): void {
    let alert: Alert = this._alertCtrl.create({
      title: 'Duration',
      subTitle: 'How long did you perform this activity?',
      inputs: [
        {
          name: 'duration',
          placeholder: 'Minutes',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Done',
          handler: data => {
            activity.duration = +data.duration;
            activity.energyBurn = this._activitySvc.getActivityEnergyBurn(activity);
            this.selectedActivity = activity;
          }
        }
      ]
    });
    alert.present();
  }

  ionViewWillEnter(): void {
    this.activities = this._activitySvc.getActivities$();
    //this._activitySvc.changeActivityQueryLimit(this.limit);
    console.log('Entering...');
    this._detectorRef.markForCheck();
  }

  ionViewWillUnload(): void {
    console.log('Destroying...');
    this._detectorRef.detach();
  }
}
