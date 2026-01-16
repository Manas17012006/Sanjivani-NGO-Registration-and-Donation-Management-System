import React, { useState, useContext } from "react";
import NewNav from "../components/NewNav";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Appcontext } from "../context/Appcontext";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
  "pk_test_51SoTvmB7ey8IjxF6g6n4I5vwdqW9M4Dboa21TGwxXuSoI8NhhAk4SlkPpuVTorsEUudKlDiEoWF5FzccfCCDe49h00DIHpOn8U"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { backendUrl } = useContext(Appcontext);

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("token");

      const res = await axios.post(
        backendUrl + "/api/donation/create-payment-intent",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(`❌ ${result.error.message}`);
      } else if (result.paymentIntent.status === "succeeded") {
        await axios.post(
          backendUrl + "/api/donation/confirm",
          { paymentIntentId: result.paymentIntent.id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Donation successful")
        setMessage("❤️ Thank you! Your donation was successful.");
        setAmount("");
        elements.getElement(CardElement).clear();
      }
    } catch (err) {
      setMessage("❌ Something went wrong. Please try again.");
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false);
      
    }
  };

  return (
    <div style={styles.wrapper}>
      {loading ? <Loading message="Processing your donation..."/> : null}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          “Let's Together Make a Difference.”
        </h1>
        <p style={styles.heroSub}>
          Your kindness today can change someone’s tomorrow
        </p>

        <div style={styles.stripeBadge}>
          🔒 Secure payments powered by <b>Stripe</b> (Test Mode)
        </div>
      </div>
      <div style={styles.card}>
        <h2 style={styles.title}>Support Sanjivani</h2>
        <p style={styles.subtitle}>
          Every contribution helps us serve communities with care & dignity
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter amount (INR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={styles.input}
          />

          <div style={styles.cardBox}>
            <CardElement />
          </div>

          <button disabled={loading} style={styles.button}>
            {loading ? "Processing..." : "Donate Securely"}
          </button>
        </form>

        {message && (
          <p
            style={{
              ...styles.message,
              color: message.startsWith("❌") ? "#d32f2f" : "#2e7d32",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

const User = () => {
  return (
    <>
      <NewNav />
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #e3f2fd, #e8f5ff)",
    paddingBottom: "60px",
  },

  hero: {
    padding: "80px 20px 40px",
    textAlign: "center",
  },

  heroTitle: {
    fontSize: "32px",
    fontWeight: "600",
    color: "#0d47a1",
    marginBottom: "10px",
  },

  heroSub: {
    fontSize: "16px",
    color: "#1565c0",
    marginBottom: "18px",
  },

  stripeBadge: {
    display: "inline-block",
    background: "#ffffffcc",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    color: "#333",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },

  card: {
    maxWidth: "420px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.95)",
    boxShadow: "0 15px 40px rgba(0,0,0,0.12)",
    textAlign: "center",
  },

  title: {
    fontSize: "22px",
    marginBottom: "6px",
    color: "#0d47a1",
  },

  subtitle: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "22px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #cfd8dc",
    fontSize: "14px",
  },

  cardBox: {
    padding: "12px",
    border: "1px solid #cfd8dc",
    borderRadius: "10px",
    marginBottom: "22px",
    background: "#fafafa",
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(135deg, #2196f3, #1e88e5)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
  },

  message: {
    marginTop: "16px",
    fontSize: "14px",
  },
};

export default User;
