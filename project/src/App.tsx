import React, { useState } from 'react';
import { Schedule, Course, TimeSlot, Role } from './types/schedule';
import { ScheduleGrid } from './components/ScheduleGrid';
import { ScheduleForm } from './components/ScheduleForm';
import { GraduationCap, Calendar, AlertTriangle } from 'lucide-react';

function App() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<number>(0);
  const [userRole, setUserRole] = useState<Role>('admin');

  const generateSchedule = ({
    course,
    preferredTimes,
  }: {
    course: Course;
    preferredTimes: TimeSlot[];
  }) => {
    // In a real application, this would use an algorithm to generate optimal schedules
    const newSchedule: Schedule = {
      id: Math.random().toString(),
      entries: [
        {
          ...course,
          id: Math.random().toString(),
          assignedTime: preferredTimes[0] || {
            day: 'Monday',
            startTime: '09:00',
            endTime: '10:00',
          },
          room: '101',
        },
      ],
      conflicts: 0,
    };

    setSchedules([...schedules, newSchedule]);
    setSelectedSchedule(schedules.length);
  };

  const handleEntryClick = (entryId: string) => {
    if (userRole === 'student') return;
    // Handle entry click for editing
    console.log('Editing entry:', entryId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">
                Class Schedule Generator
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value as Role)}
                className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="professor">Professor</option>
                <option value="student">Student</option>
              </select>
              <div className="flex items-center text-gray-600">
                <GraduationCap className="h-5 w-5 mr-1" />
                <span className="capitalize">{userRole} View</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {userRole !== 'student' && (
            <div className="lg:col-span-1">
              <ScheduleForm onGenerate={generateSchedule} />
            </div>
          )}
          
          <div className={userRole === 'student' ? 'col-span-full' : 'lg:col-span-2'}>
            {schedules.length > 0 ? (
              <>
                {schedules.length > 1 && (
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex space-x-2">
                      {schedules.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedSchedule(index)}
                          className={`px-4 py-2 rounded-md ${
                            selectedSchedule === index
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          Schedule {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {schedules[selectedSchedule].conflicts > 0 && (
                  <div className="mb-4 p-4 bg-yellow-50 rounded-lg flex items-center">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2" />
                    <span className="text-yellow-700">
                      This schedule has {schedules[selectedSchedule].conflicts} conflicts that need resolution.
                    </span>
                  </div>
                )}

                <ScheduleGrid
                  schedule={schedules[selectedSchedule]}
                  onEntryClick={handleEntryClick}
                  isEditable={userRole !== 'student'}
                />
              </>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-lg text-center">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Schedules Generated Yet
                </h3>
                <p className="text-gray-500">
                  {userRole === 'student'
                    ? 'No schedules are available for viewing yet.'
                    : 'Use the form to generate your first class schedule.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;