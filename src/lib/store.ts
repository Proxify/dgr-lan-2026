import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { RSVPResponse } from '@/types';

interface RSVPState {
  // Form state
  currentResponse: Partial<RSVPResponse>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;

  // Actions
  setField: <K extends keyof RSVPResponse>(field: K, value: RSVPResponse[K]) => void;
  resetForm: () => void;
  submitRSVP: () => Promise<void>;
  loadExistingRSVP: () => Promise<void>;
}

const initialFormState: Partial<RSVPResponse> = {
  name: '',
  attending: undefined,
  arrivalTime: '',
  equipment: [],
  dietaryRestrictions: '',
  notes: '',
};

export const useRSVPStore = create<RSVPState>()(
  persist(
    (set, get) => ({
      currentResponse: initialFormState,
      isSubmitting: false,
      isSubmitted: false,
      error: null,

      setField: (field, value) => {
        set((state) => ({
          currentResponse: {
            ...state.currentResponse,
            [field]: value,
          },
        }));
      },

      resetForm: () => {
        set({
          currentResponse: initialFormState,
          isSubmitted: false,
          error: null,
        });
      },

      loadExistingRSVP: async () => {
        try {
          const response = await fetch('/api/rsvp');
          if (response.ok) {
            const { data } = await response.json();
            if (data) {
              set({
                currentResponse: {
                  name: data.name,
                  attending: data.attending,
                  arrivalTime: data.arrival_time || '',
                  equipment: data.equipment || [],
                  notes: data.notes || '',
                },
                isSubmitted: true,
              });
            } else {
              // No existing RSVP found - reset the submitted state
              // This handles cases where localStorage has stale data
              set({
                currentResponse: initialFormState,
                isSubmitted: false,
              });
            }
          }
        } catch (error) {
          console.error('Failed to load existing RSVP:', error);
        }
      },

      submitRSVP: async () => {
        const { currentResponse } = get();

        // Validate required fields
        if (!currentResponse.name || !currentResponse.attending) {
          set({ error: 'Please fill in all required fields' });
          return;
        }

        set({ isSubmitting: true, error: null });

        try {
          const response = await fetch('/api/rsvp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: currentResponse.name,
              attending: currentResponse.attending,
              arrivalTime: currentResponse.arrivalTime || '',
              equipment: currentResponse.equipment || [],
              notes: currentResponse.notes || '',
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Failed to submit RSVP');
          }

          const { data } = await response.json();
          console.log('RSVP Submitted:', data);

          set({
            isSubmitting: false,
            isSubmitted: true,
          });
        } catch (error) {
          set({
            isSubmitting: false,
            error: error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.',
          });
        }
      },
    }),
    {
      name: 'woodlands-lan-rsvp',
      partialize: (state) => ({
        currentResponse: state.currentResponse,
        isSubmitted: state.isSubmitted,
      }),
    }
  )
);
