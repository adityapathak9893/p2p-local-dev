import React, { useState } from "react";
import "./FeedBackForm.scss"; // Import your SCSS file

interface FeedBackFormProps {
  onSubmit: (feedback: { message: string; rating: number }) => void;
}

export const FeedBackForm: React.FC<FeedBackFormProps> = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(event.target.value);
    setRating(newRating);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Send feedback to the parent component
    onSubmit({ message, rating });
  };

  return (
    <div className="feedback-form-container">
      <h2>Leave Feedback</h2>
      <form className="feedback-form" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={rating}
            onChange={handleRatingChange}
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};
