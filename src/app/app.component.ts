import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ReactiveFormExample';

  singleDayForm = this.fb.group({
    openings: this.fb.array([
      this.generateIntervalRuleControls()
    ])
  });

  // businessHours: { [key: string]: OpeningRule[] } | undefined;


  dayOfWeekKeysOrdered = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

  constructor(private fb: FormBuilder) {
  }

  private generateIntervalRuleControls(): FormGroup {
    return this.fb.group({
      fromHours: [''],
      fromMinutes: [''],
      toHours: [''],
      toMinutes: [''],
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

