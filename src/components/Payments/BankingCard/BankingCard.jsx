import React, { useState, useEffect } from "react";
import "./BankingCard.css";

const BankingCard = () => {
  const [cards, setCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [updatedCard, setUpdatedCard] = useState({ cardHolderName: "", expiryDate: "" });
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
  }, []);

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

  const handleEdit = (card) => {
    setEditCard(card.id);
    setUpdatedCard({ cardHolderName: card.cardHolderName, expiryDate: card.expiryDate });
  };

  const handleUpdate = async (cardId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/cards/${cardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedCard),
      });

      if (!response.ok) {
        throw new Error("Failed to update card");
      }

      setCards(cards.map((card) => (card.id === cardId ? { ...card, ...updatedCard } : card)));
      setEditCard(null);
      console.log(`Card ${cardId} updated successfully`);
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  return (
    <div className="BankingCardContainer">
      {cards.length === 0 ? (
        <p>No cards found.</p>
      ) : (
        cards.map((card) => (
          <div className="BankingCard" key={card.id}>
            <div className="bc-header">
              <div className="bc-bank-name">{card.cardType || "Unknown Type"}</div>
              <button className="bc-edit" onClick={() => handleEdit(card)}>Edit</button>
              <button className="bc-delete" onClick={() => handleDelete(card.id)}>Delete</button>
            </div>
            {editCard === card.id ? (
              <div className="edit-form">
                <input
                  type="text"
                  value={updatedCard.cardHolderName}
                  onChange={(e) => setUpdatedCard({ ...updatedCard, cardHolderName: e.target.value })}
                  placeholder="Cardholder Name"
                />
                <input
                  type="text"
                  value={updatedCard.expiryDate}
                  onChange={(e) => setUpdatedCard({ ...updatedCard, expiryDate: e.target.value })}
                  placeholder="Expiry Date (MM/YY)"
                />
                <button className="bc-save" onClick={() => handleUpdate(card.id)}>Save</button>
                <button className="bc-cancel" onClick={() => setEditCard(null)}>Cancel</button>
              </div>
            ) : (
              <>
                <div className="bc-acc-num">
                  <div className="bc-acc-num-name">Card Number:</div>
                  <div className="bc-acc-num-val">{card.maskedCardNumber || "****-****-****-XXXX"}</div>
                </div>
                <div className="bc-acc-num">
                  <div className="bc-acc-num-name">Cardholder Name:</div>
                  <div className="bc-acc-num-val">{card.cardHolderName}</div>
                </div>
                <div className="bc-acc-num">
                  <div className="bc-acc-num-name">Expiry Date:</div>
                  <div className="bc-acc-num-val">{card.expiryDate}</div>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BankingCard;
