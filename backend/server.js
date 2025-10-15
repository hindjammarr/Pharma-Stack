const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
console.log('🔑 Stripe Key:', process.env.STRIPE_SECRET_KEY ? 'Loaded ✅' : '❌ Missing');

const app = express();

// --- Middleware global sauf pour webhook ---
app.use(cors());
app.use(express.static('uploads'));


app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle successful payment
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;
    const cartItems = JSON.parse(paymentIntent.metadata.cartItems);
    const shippingInfo = JSON.parse(paymentIntent.metadata.shippingInfo);

    try {
      // 2️⃣ Create new Order in MongoDB
      const order = new Order({
        userId,
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: paymentIntent.amount / 100,
        status: 'confirmed',
        shippingInfo,
      });

      await order.save();
      console.log('✅ Order created after payment:', order._id);
    } catch (error) {
      console.error('❌ Error saving order after payment:', error);
    }
  }

  res.json({ received: true });
});

// --- Après webhook : activer express.json pour les autres routes ---
app.use(express.json());

// --- Connexion MongoDB ---
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => console.log('✅ Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB error:', err));

// --- Routes principales ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/pharmacy', require('./routes/pharmacyRoutes'));


// app.post('/api/create-payment-intent', async (req, res) => {
//   try {
//     const { amount, currency, cartItems, shippingInfo, email, userId } = req.body;

//     // 1️⃣ Create payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency,
//       receipt_email: email,
//       metadata: {
//         userId,
//         cartItems: JSON.stringify(cartItems),
//         shippingInfo: JSON.stringify(shippingInfo),
//       },
//     });

//     res.status(200).send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error('Error creating payment intent:', error);
//     res.status(500).json({ message: 'Erreur serveur Stripe' });
//   }
// });
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, cartItems, shippingInfo, email, userId } = req.body;
    console.log("userId reçu :", userId);
    // 🧹 Simplifier les données à envoyer
    const simplifiedCart = cartItems.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
    }));

    const simplifiedShipping = {
      city: shippingInfo.city,
      country: shippingInfo.country,
      postalCode: shippingInfo.postalCode,
    };

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      receipt_email: email,
      metadata: {
        // userId: userId.toString(),    
  userId: userId ? userId.toString() : "anonymous",
        cartSummary: JSON.stringify(simplifiedCart),
        shippingSummary: JSON.stringify(simplifiedShipping),
      },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ message: 'Erreur serveur Stripe' });
  }
});

// --- Gestion erreurs globales ---
app.use((err, req, res, next) => {
  console.error('🔥 Erreur serveur:', err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// --- Lancer serveur ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


