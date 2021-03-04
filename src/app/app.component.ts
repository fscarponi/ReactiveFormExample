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

  dailyOpenings: { [key: string]: ResultOfValidation };

  dayOfWeekKeysOrdered = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  constructor(private fb: FormBuilder) {
  }


  createjson(value: any): void {
    console.log(value);
  }

  printDatas(): void {

  }

  handleEvent(eventNotification: any): void {
    console.log(eventNotification);
    const result = eventNotification as ResultOfValidation;
    if (result.error) {
      console.log('giorno ' + result.day + ' campi non validi');
    } else {
      console.log('giorno ' + result.day + ' campi ok: ' + result.data);
      this.dailyOpenings[result.day] = result;
    }
  }
}

