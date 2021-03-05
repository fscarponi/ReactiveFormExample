import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';

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

  constructor(
    private fb: FormBuilder
  ) {
  }

  @Output() openingsChange = new EventEmitter<ResultOfValidation>();
  @Input() day: string;


  singleDayForm = this.fb.group({
    openings: this.fb.array([
      this.generateIntervalRuleControls()
    ], [DailyOpeningsComponent.timeSlotsNotOverlapping])
  });


  // bisogna mettere il validator sul form array
  // sul form group al massimo posso metterci un controllo che le date vengano


  private static timeSlotsNotOverlapping(formArray: FormArray): null | ValidationErrors {
// Need to check if this works, theoretically it should
    let foundErrors = false;
    for (const opening of formArray.controls) {
      for (const otherOpening of formArray.controls) {

        const absoluteStartFirst: number = ((opening.get('fromHours').value) * 60) + (opening.get('fromMinutes').value);
        const absoluteEndFirst: number = ((opening.get('toHours').value) * 60) + (opening.get('toMinutes').value);
        const absoluteStartOther: number = ((otherOpening.get('fromHours').value) * 60) + (otherOpening.get('fromMinutes').value);
        const absoluteEndOther: number = ((otherOpening.get('toHours').value) * 60) + (otherOpening.get('toMinutes').value);
        if (this.overlapFunction(absoluteStartFirst, absoluteEndFirst, absoluteStartOther, absoluteEndOther)) {
          opening.setErrors({overlapError: true});
          foundErrors = true;
        }
      }
    }
    return (foundErrors ? {arrayError: true} : null);

  }

  private static overlapFunction(startFirst: number, endFirst: number, startSecond: number, endSecond: number): boolean {
    return ((startFirst <= endSecond) && (startSecond <= endFirst));
  }


  ngOnInit(): void {
    // this.singleDayForm.valueChanges.subscribe(
    //   valueChanged => {
    //     console.log('something changed');
    //   }
    // );
  }

  private generateIntervalRuleControls(): FormGroup {
    const generatedForm = this.fb.group({
      fromHours: [10, [Validators.min(0), Validators.max(23)]],
      fromMinutes: [30, [Validators.min(0), Validators.max(59)]],
      toHours: [14, [Validators.min(0), Validators.max(23)]],
      toMinutes: [30, [Validators.min(0), Validators.max(59)]],
      takeAway: true,
      delivery: true
    });
    // needs to chenge someth9ing generatedForm.setValidators(DailyOpeningsComponent.timeSlotsNotOverlapping);
    return generatedForm;
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

  /*IN TEORIA FUNZIONA BISOGNA FINIRE DI TESTARLO */


  formChanged(): void {
    console.log(this.timeSlotCorrectFormat());
    // this.timeSlotsNotOverlapping();
    // const randomBoolean = Math.random() < 0.5;
    if (this.singleDayForm.valid) {
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
  }
}
