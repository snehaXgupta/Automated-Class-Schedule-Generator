export interface Professor {
  id: string;
  name: string;
  availability: TimeSlot[];
}

export interface Course {
  id: string;
  name: string;
  semesterHours: number;
  professor?: Professor;
  preferredTimes?: TimeSlot[];
}

export interface TimeSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string;
  endTime: string;
}

export interface ScheduleEntry extends Course {
  assignedTime: TimeSlot;
  room: string;
  conflicts?: string[];
}

export interface Schedule {
  id: string;
  entries: ScheduleEntry[];
  conflicts: number;
}

export type Role = 'admin' | 'professor' | 'student';