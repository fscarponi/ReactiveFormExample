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

  timeSlotCorrectFormat(): boolean {
    const openings = this.singleDayForm.get('openings') as FormArray;
    for (const opening of openings.controls) {
      const fromHours: number = opening.get('fromHours').value;
      const fromMinutes: number = opening.get('fromMinutes').value;
      const toHours: number = opening.get('toHours').value;
      const toMinutes: number = opening.get('toMinutes').value;
      if ((fromHours * 60 + fromMinutes) > (toHours * 60 + toMinutes)) {
        return false;
      }
    }
    return true;
  }

  overlapFunction(startFirst: number, endFirst: number, startSecond: number, endSecond: number): boolean {
    return ((startFirst <= endSecond) && (startSecond <= endFirst));
  }

  /*IN TEORIA FUNZIONA BISOGNA FINIRE DI TESTARLO */
  timeSlotsNotOverlapping(): boolean {
    const openings = this.singleDayForm.get('openings') as FormArray;
    if (openings.controls.length === 1) {
      return false;
    }
    let i = 0;
    for (const opening of openings.controls) {

      const fromHours: number = opening.get('fromHours').value;
      const fromMinutes: number = opening.get('fromMinutes').value;
      const toHours: number = opening.get('toHours').value;
      const toMinutes: number = opening.get('toMinutes').value;
      const absoluteMinuteFrom: number = ((fromHours * 60) + fromMinutes);
      const absoluteMinuteTo: number = ((toHours * 60) + toMinutes);
      const openings2 = this.singleDayForm.get('openings') as FormArray;
      let j = 0;
      for (const opening2 of openings2.controls) {
        if (i !== j) {
          const fromHours2: number = opening2.get('fromHours').value;
          const fromMinutes2: number = opening2.get('fromMinutes').value;
          const toHours2: number = opening2.get('toHours').value;
          const toMinutes2: number = opening2.get('toMinutes').value;
          const absoluteMinuteFrom2: number = ((fromHours2 * 60) + fromMinutes2);
          const absoluteMinuteTo2: number = ((toHours2 * 60) + toMinutes2);
          if (this.overlapFunction(absoluteMinuteFrom, absoluteMinuteTo, absoluteMinuteFrom2, absoluteMinuteTo2) === true) {
            console.log('it does overlap');
          } else {
            console.log('they dont overlap');
          }
        }
        j++;
      }
      i++;
    }
  }


  formChanged(): void {
    console.log(this.timeSlotCorrectFormat());
    this.timeSlotsNotOverlapping();
    //   const randomBoolean = Math.random() < 0.5;
    //   if (randomBoolean) {
    //     this.openingsChange.emit(
    //       {
    //         error: true,
    //         day: this.day
    //       }
    //     );
    //   } else {
    //     this.openingsChange.emit(
    //       {
    //         data: this.singleDayForm.value,
    //         day: this.day
    //       }
    //     );
    //   }
  }
}
