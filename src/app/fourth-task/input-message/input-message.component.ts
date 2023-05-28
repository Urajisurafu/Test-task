import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { debounceTime, delay, shareReplay, switchMap } from "rxjs/operators";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "input-message",
  templateUrl: "input-message.component.html",
  styleUrls: ["input-message.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputMessageComponent implements OnInit, OnDestroy {
  private userDataSource: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private term: Subject<string> = new Subject<string>();

  userData = this.userDataSource.asObservable();
  items: Observable<string[]>;

  constructor(private changeDetection: ChangeDetectorRef) {}

  addFormControl = new FormControl("", [Validators.required]);
  searchFormControl = new FormControl("", [Validators.required]);

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
    this.showItems();
  }

  showItems() {
    this.items = this.term.pipe(
      debounceTime(250),
      switchMap((term: string) => this.searchMessages(term)),
      shareReplay(1)
    );
  }

  ngOnDestroy(): void {
    this.term.complete();
  }

  applyChanges() {
    this.changeDetection.reattach();
    this.searchFormControl.setValue("");
  }

  addItem(keyword: string) {
    if (keyword) {
      this.changeDetection.reattach();
      const currentValue = this.userDataSource.value;
      const updatedValue = [...currentValue, keyword];
      this.userDataSource.next(updatedValue);
      this.addFormControl.setValue("");
    }
  }

  search(term: string) {
    if (term) return this.term.next(term);
  }

  searchMessages(keyword: string): Observable<string[]> {
    if (keyword) {
      this.changeDetection.detach();
      let data;

      this.userData.subscribe((value) => (data = value));
      const filtered: string[] = data.filter((item) =>
        `${item}`.match(keyword)
      );
      return of(filtered).pipe(delay(100));
    }
  }
}
