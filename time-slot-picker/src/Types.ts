export type Company = {
  id: number;
  name: string;
  type: string;
  time_slots: TimeSlot[];
};

export type TimeSlot = {
  start_time: string;
  end_time: string;
};

export type SelectedSlot = {
  companyId: number;
  slot: TimeSlot;
};
