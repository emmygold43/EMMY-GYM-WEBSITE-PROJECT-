export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

export interface ChatResponse {
  reply: string;
  triggerBooking?: boolean;
  error?: string;
}

export async function sendVoiceQueryToAI(
  message: string,
  history: ChatTurn[]
): Promise<ChatResponse> {
  try {
    const res = await fetch('/api/voice/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory: history,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return {
        reply:
          errorData.fallbackReply ||
          'I am having trouble reaching our live records right now. You can check our hours (Monday-Friday 5:30 AM to 10:00 PM, Saturday-Sunday 7:00 AM to 6:00 PM) or arrange your free introductory session on this page.',
        error: errorData.error,
      };
    }

    const data = await res.json();
    return {
      reply: data.reply || 'I am here to assist you with verified EMMY Boxing Club information.',
      triggerBooking: !!data.triggerBooking,
    };
  } catch (err: any) {
    return {
      reply:
        'I am unable to connect to the server at this moment. You can visit us at 450 Champions Way or claim your free introductory session directly.',
      error: err.message,
    };
  }
}
