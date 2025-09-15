import { useContext } from 'react';
import { useProfileCompletionContext } from './ProfileCompletionContext';

export default function useProfileCompletion() {
  return useProfileCompletionContext();
}
