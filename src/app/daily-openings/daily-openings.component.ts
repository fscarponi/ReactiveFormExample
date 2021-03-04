import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

export interface ResultOfValidation {
  error?: boolean;
  data?: string;
}

@Component({
  selector: 'app-daily-openings',
  templateUrl: './daily-openings.component.html',
  styleUrls: ['./daily-openings.component.css']
})
export class DailyOpeningsComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<ResultOfValidation>();

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

}
