import { useMutation } from '@tanstack/react-query';
import { aiService } from '@/api/assistant.api';

export const useAI = (tripId: string) => {
  const chatMutation = useMutation({
    mutationFn: (message: string) => aiService.chatWithAssistant(tripId, message),
  });

  return {
    chatMutation,
  };
};
