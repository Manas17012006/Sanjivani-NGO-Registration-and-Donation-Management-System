const express = require("express");
const Stripe = require("stripe");
const Donation = require("../models/donationModel.model");
const { userAuth } = require("../middleware/auth.mw");

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create Payment Intent
router.post("/create-payment-intent", userAuth, async (req, res) => {
  const { amount } = req.body;
  const userId = req.userId;

  try {
    const amountInPaise = Number(amount) * 100;

    if (!amountInPaise || amountInPaise <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInPaise,
      currency: "inr",
    });

    await Donation.create({
      userId,
      amount: Number(amount),
      paymentIntentId: paymentIntent.id,
      status: "pending",
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe Error:", err);
    res.status(500).send({ error: err.message });
  }
});


router.post("/confirm", userAuth, async (req, res) => {
  const { paymentIntentId } = req.body;
  const userId = req.userId;

  try {
    await Donation.findOneAndUpdate(
      { paymentIntentId, userId },
      { status: "success" }
    );
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
