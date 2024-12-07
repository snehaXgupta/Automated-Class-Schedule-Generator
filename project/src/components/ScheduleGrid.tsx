import React from 'react';
import { Schedule, TimeSlot } from '../types/schedule';
import { Clock } from 'lucide-react';

interface Props {
  schedule: Schedule;
  onEntryClick?: (entryId: string) => void;
  isEditable?: boolean;
}

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const ScheduleGrid: React.FC<Props> = ({ schedule, onEntryClick, isEditable = false }) => {
  const getEntryAtSlot = (day: string, time: string) => {
    return schedule.entries.find(entry => 
      entry.assignedTime.day === day && 
      entry.assignedTime.startTime === time
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-6 gap-px bg-gray-200">
        <div className="bg-gray-50 p-4 flex items-center justify-center">
          <Clock className="w-5 h-5 text-gray-500" />
        </div>
        {days.map(day => (
          <div key={day} className="bg-gray-50 p-4 font-semibold text-center">
            {day}
          </div>
        ))}
        {timeSlots.map(time => (
          <React.Fragment key={time}>
            <div className="bg-white p-4 text-sm text-gray-600 text-center border-t">
              {time}
            </div>
            {days.map(day => {
              const entry = getEntryAtSlot(day, time);
              return (
                <div
                  key={`${day}-${time}`}
                  className={`bg-white p-4 border-t ${
                    entry
                      ? 'bg-blue-50 cursor-pointer hover:bg-blue-100 transition-colors'
                      : ''
                  } ${entry?.conflicts?.length ? 'bg-red-50 hover:bg-red-100' : ''}`}
                  onClick={() => entry && onEntryClick?.(entry.id)}
                >
                  {entry && (
                    <div className="text-sm">
                      <p className="font-medium">{entry.name}</p>
                      <p className="text-gray-600">{entry.professor?.name}</p>
                      <p className="text-gray-500 text-xs">Room {entry.room}</p>
                      {entry.conflicts?.length > 0 && (
                        <p className="text-red-600 text-xs mt-1">
                          {entry.conflicts.length} conflict(s)
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};