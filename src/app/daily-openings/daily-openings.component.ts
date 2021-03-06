import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

export interface ResultOfValidation {
  day: string;
  error?: boolean;
  data?: string;
}

@Component({
  selector: 'app-daily-openings',
  templateUrl: './daily-openings.component.html',
  styleUrls: ['./daily-openings.component.css']
})
export class DailyOpeningsComponent implements OnInit {

  @Output() openingsChange = new EventEmitter<ResultOfValidation>();
  @Input() day: string;

  singleDayForm = this.fb.group({
    openings: this.fb.array([
      this.generateIntervalRuleControls()
    ])
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    // this.singleDayForm.valueChanges.subscribe(
    //   valueChanged => {
    //     console.log('something changed');
    //   }
    // );
  }

  private generateIntervalRuleControls(): FormGroup {
    return this.fb.group({
      fromHours: [10],
      fromMinutes: [30],
      toHours: [14],
      toMinutes: [30],
      takeAway: true,
      delivery: true
    });
  }


  moreOpenings(): void {
    const fg = this.generateIntervalRuleControls();
    (this.singleDayForm.get('openings') as FormArray).push(fg);
  }


  lessOpenings(i: number): void {
    if (i > 0) {
      (this.singleDayForm.get('openings') as FormArray).removeAt(i);
    }
  }


  createjson(value: any): void {
    console.log(value);
  }

  // timeSlotCorrectFormat() {
  //   for()
  // }
  //
  // timeSlotsNotOverlapping() {
  //
  // }


  formChanged(): void {
    const randomBoolean = Math.random() < 0.5;
    console.log('figlio ' + this.day + ' emetto evento!');
    if (randomBoolean) {
      this.openingsChange.emit(
        {
          error: true,
          day: this.day
        }
      );
    } else {
      this.openingsChange.emit(
        {
          data: this.singleDayForm.value,
          day: this.day
        }
      );
    }
    console.log('Something changed and form html notified');
  }
}
