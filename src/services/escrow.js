const ESCROW_API_URL = 'https://api.escrow.com/2017-09-01';
const API_KEY = import.meta.env.VITE_ESCROW_API_KEY;

export const createEscrowTransaction = async (escrowData) => {
  try {
    const response = await fetch(`${ESCROW_API_URL}/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(escrowData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating escrow transaction:', error);
    throw error;
  }
}; 