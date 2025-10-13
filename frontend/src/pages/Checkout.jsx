import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { CreditCard, Package } from "lucide-react";
import { Link } from "wouter";
import orderService from "../services/orderService";
import { useAuth } from "../context/AuthContext";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Badge = ({ children, variant = "secondary", className = "" }) => {
  const base =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold";
  const variants = {
    secondary: "bg-lavender text-teal",
    success: "bg-mintGreen text-white",
  };
  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "md",
  type = "button",
}) => {
  const sizes = { lg: "py-3 px-8 text-lg", md: "py-2 px-6 text-base" };
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variantsStyles = {
    primary: "bg-teal-600 hover:bg-teal-700 text-white",
    secondary:
      "border border-lavender text-lavender hover:bg-lavender hover:text-white focus:ring-lavender",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variantsStyles[variant]}`}
    >
      {children}
    </button>
  );
};

const Input = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  className = "",
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent transition ${
          error ? "border-red-500" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

const CheckoutForm = ({
  formData,
  setFormData,
  errors,
  setErrors,
  cartItems,
  grandTotal,
  onSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const { token } = useAuth();


  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Prénom requis";
    if (!formData.lastName.trim()) newErrors.lastName = "Nom requis";
    if (!formData.email.includes("@")) newErrors.email = "Email invalide";
    if (!formData.phone.trim()) newErrors.phone = "Téléphone requis";
    if (!formData.address.trim()) newErrors.address = "Adresse requise";
    if (!formData.city.trim()) newErrors.city = "Ville requise";
    if (!formData.zipCode.trim()) newErrors.zipCode = "Code postal requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setPaymentError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(grandTotal * 100),
            currency: "eur",
            cartItems,
            email: formData.email,
            shippingInfo: {
              name: `${formData.firstName} ${formData.lastName}`,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              zipCode: formData.zipCode,
            },
          }),
        
        }
      );

      if (!response.ok) throw new Error("Erreur création paiement");

      const { clientSecret } = await response.json();

      if (!stripe || !elements) return;

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: formData.address,
                city: formData.city,
                postal_code: formData.zipCode,
              },
            },
          },
        }
      );

 
   if (error) {
        setPaymentError(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // ✅ Créer la commande dans la base
        const orderData = {
          products: cartItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          total: grandTotal,
          shippingInfo: {
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
          },
          paymentIntentId: paymentIntent.id,
        };

        try {
          await orderService.createOrder(orderData, token);
          onSuccess();
          alert("✅ Paiement réussi et commande enregistrée !");
        } catch (err) {
          console.error("❌ Erreur enregistrement commande :", err);
          setPaymentError("Paiement réussi mais erreur lors de l'enregistrement de la commande.");
        }
      }
    } catch (error) {
      console.error("Erreur paiement:", error);
      setPaymentError("Erreur lors du paiement. Vérifiez vos informations.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Input
          id="firstName"
          label="Prénom"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          id="lastName"
          label="Nom"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          id="phone"
          label="Téléphone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
      </div>

      <Input
        id="address"
        label="Adresse"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Input
          id="city"
          label="Ville"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />
        <Input
          id="zipCode"
          label="Code Postal"
          value={formData.zipCode}
          onChange={handleChange}
          error={errors.zipCode}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <CreditCard className="inline mr-2 h-4 w-4 text-teal" />
          Informations de carte
        </label>
        <div className="p-3 border border-gray-300 rounded-xl">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#fa755a" },
              },
            }}
          />
        </div>
        {paymentError && (
          <p className="text-red-500 text-sm mt-1">{paymentError}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || !stripe || !elements}
        className="w-full"
      >
        {isSubmitting ? (
          <>
            <Package className="mr-2 h-5 w-5 animate-spin" />
            Traitement du paiement...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-5 w-5" />
            Payer {grandTotal.toFixed(2)} €
          </>
        )}
      </Button>
    </form>
  );
};

const Checkout = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItems = storedCart;

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => {
        const price = Number(item?.product?.price) || 0;
        const quantity = Number(item?.quantity || 1);
        return sum + price * quantity;
      }, 0)
    : 0;

  const shipping = subtotal > 50 ? 0 : 5.99;
  const grandTotal = Number(subtotal + shipping);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [errors, setErrors] = useState({});

  const handleSuccess = () => {
    localStorage.removeItem("cart");
    window.location.href = "/confirmation";
  };

  return (
    <div className="min-h-screen bg-lightGray py-12 font-inter">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <Elements stripe={stripePromise}>
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-subtle p-8">
                <h2 className="text-2xl font-semibold text-teal mb-6">
                  Finaliser la commande
                </h2>
                <CheckoutForm
                  formData={formData}
                  setFormData={setFormData}
                  errors={errors}
                  setErrors={setErrors}
                  cartItems={cartItems}
                  grandTotal={grandTotal}
                  onSuccess={handleSuccess}
                />
              </div>
            </div>
          </Elements>

          {/* Résumé commande (simplifié) */}
          <div className="md:col-span-1 bg-white rounded-xl shadow-subtle p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Résumé de la commande
            </h3>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>
                  {item.product.name} × {item.quantity}
                </span>
                <span>{(item.product.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between text-gray-700">
              <span>Sous-total</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Livraison</span>
              <span>{shipping.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-teal font-semibold text-lg mt-4">
              <span>Total</span>
              <span>{grandTotal.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
