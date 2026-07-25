import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { interviews as initialInterviews, type InterviewEntry } from '../data/recruiterMock';

interface ScheduleInterviewInput {
  candidateId: string;
  candidateName: string;
  role: string;
  date: string;
  time: string;
}

interface InterviewState {
  interviews: InterviewEntry[];
  scheduleInterview: (input: ScheduleInterviewInput) => void;
  cancelInterview: (id: string) => void;
}

export const useInterviewStore = create<InterviewState>()(
  persist(
    (set) => ({
      interviews: initialInterviews,
      scheduleInterview: (input) =>
        set((state) => ({
          interviews: [
            { id: crypto.randomUUID(), status: 'scheduled', ...input },
            ...state.interviews,
          ],
        })),
      cancelInterview: (id) =>
        set((state) => ({
          interviews: state.interviews.map((entry) =>
            entry.id === id ? { ...entry, status: 'cancelled' } : entry,
          ),
        })),
    }),
    { name: 'skillproof-interviews' },
  ),
);
