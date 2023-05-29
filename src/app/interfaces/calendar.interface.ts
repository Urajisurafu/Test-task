import * as moment from "moment";

interface Day {
  value: moment.Moment;
  active: boolean;
  disabled: boolean;
  selected: boolean;
}

export interface Week {
  days: Day[];
}
