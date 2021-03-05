import {Component} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ResultOfValidation} from './daily-openings/daily-openings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactiveFormExample';

  // businessHours: { [key: string]: OpeningRule[] } | undefined;

  dailyOpenings: { [key: string]: ResultOfValidation } = { };

  areAllFormValidated: boolean;

  daysOfWeekKeysOrdered = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  createjson(value: any): void {
    console.log(value);
  }

  printDatas(): void {

  }

  handleEvent(result: ResultOfValidation): void {
    console.log(result);
    this.dailyOpenings[result.day] = result;
    // now i should check validation on the full map for enable submit button
    this.checkAllFormsAreValid();
  }


  // if just one form contains an error we set the areAllFormValidated as false
  // if all ResultOfValidation are ok we set areAllFormValidated as true to enable "submit" button
  private checkAllFormsAreValid(): void {
    for (const day of this.daysOfWeekKeysOrdered) {
      if (this.dailyOpenings[day] && this.dailyOpenings[day].error) {
        console.log('Day ' + day + 'is not valid for submit');
        this.areAllFormValidated = false;
        return;
      }
    }
    this.areAllFormValidated = true;
    console.log('All day openings are valid, here the structure ' + this.dailyOpenings);
  }
}

