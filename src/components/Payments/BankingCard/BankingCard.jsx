import React, { useState, useEffect } from "react";
import EditForm from "../EditForm/EditForm"; // Import EditForm
import "./BankingCard.css";

const BankingCard = () => {
  const [cards, setCards] = useState([]);
  const [editCardId, setEditCardId] = useState(null); // Track which card is being edited
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        console.log("Fetching cards...");

        const response = await fetch("http://localhost:8000/api/cards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Full API Response:", data);

        if (data.cards) {
          setCards(data.cards);
        } else if (data.card) {
          setCards([data.card]);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, [token]);

  const handleDelete = async (cardId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      setCards(cards.filter((card) => card.id !== cardId));
      console.log(`Card ${cardId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  const handleUpdate = async (updatedCard) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cards/${updatedCard.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedCard),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }

      setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
      setEditCardId(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div className="BankingCardContainer">
      {editCardId ? (
        <EditForm
          card={cards.find((card) => card.id === editCardId)}
          onCancel={() => setEditCardId(null)} // Cancel editing
          onUpdate={handleUpdate} // Handle card update
        />
      ) : (
        cards.length === 0 ? (
          <p>No cards found.</p>
        ) : (
          cards.map((card) => (
            <div className="BankingCard" key={card.id}>
              <div className="bc-header">
                <div className="bc-bank-name">{card.cardType || "Unknown Type"}</div>
                <button className="bc-edit" onClick={() => setEditCardId(card.id)}>Edit</button>
                <button className="bc-delete" onClick={() => handleDelete(card.id)}>Delete</button>
              </div>
              <div className="bc-acc-num">
                <div className="bc-acc-num-name">Card Number:</div>
                <div className="bc-acc-num-val">{card.maskedCardNumber || "****-****-****-XXXX"}</div>
              </div>
            </div>
          ))
        )
      )}
    </div>
  );
};

export default BankingCard;
