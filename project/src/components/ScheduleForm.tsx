import React, { useState } from 'react';
import { Course, Professor, TimeSlot } from '../types/schedule';
import { Plus, X } from 'lucide-react';

interface Props {
  onGenerate: (params: {
    course: Course;
    preferredTimes: TimeSlot[];
  }) => void;
}

export const ScheduleForm: React.FC<Props> = ({ onGenerate }) => {
  const [course, setCourse] = useState<Partial<Course>>({});
  const [preferredTimes, setPreferredTimes] = useState<TimeSlot[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (course.name && course.semesterHours) {
      onGenerate({
        course: course as Course,
        preferredTimes,
      });
    }
  };

  const addTimeSlot = () => {
    setPreferredTimes([
      ...preferredTimes,
      { day: 'Monday', startTime: '09:00', endTime: '10:00' },
    ]);
  };

  const removeTimeSlot = (index: number) => {
    setPreferredTimes(preferredTimes.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700">Course Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={course.name || ''}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Semester Hours
        </label>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={course.semesterHours || ''}
          onChange={(e) =>
            setCourse({ ...course, semesterHours: parseInt(e.target.value) })
          }
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Professor Name
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={course.professor?.name || ''}
          onChange={(e) =>
            setCourse({
              ...course,
              professor: { ...((course.professor as Professor) || {}), name: e.target.value },
            })
          }
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Times
          </label>
          <button
            type="button"
            onClick={addTimeSlot}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Time
          </button>
        </div>
        <div className="space-y-2">
          {preferredTimes.map((slot, index) => (
            <div key={index} className="flex items-center space-x-2">
              <select
                className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={slot.day}
                onChange={(e) => {
                  const newTimes = [...preferredTimes];
                  newTimes[index] = {
                    ...slot,
                    day: e.target.value as TimeSlot['day'],
                  };
                  setPreferredTimes(newTimes);
                }}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(
                  (day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  )
                )}
              </select>
              <input
                type="time"
                className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={slot.startTime}
                onChange={(e) => {
                  const newTimes = [...preferredTimes];
                  newTimes[index] = { ...slot, startTime: e.target.value };
                  setPreferredTimes(newTimes);
                }}
              />
              <input
                type="time"
                className="block w-1/4 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={slot.endTime}
                onChange={(e) => {
                  const newTimes = [...preferredTimes];
                  newTimes[index] = { ...slot, endTime: e.target.value };
                  setPreferredTimes(newTimes);
                }}
              />
              <button
                type="button"
                onClick={() => removeTimeSlot(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Generate Schedule
        </button>
      </div>
    </form>
  );
};