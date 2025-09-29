// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle } from "lucide-react";
// // import pharmacyImage from "@assets/generated_images/pharma.png";
// import pharmacyImage from "../assets/generated_images/pharma.png";


// export default function Contact() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Mock API call
//     console.log('Contact form submission:', formData);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     setIsSubmitted(true);
//     setIsSubmitting(false);
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center p-4">
//         <Card className="w-full max-w-md text-center">
//           <CardContent className="p-8">
//             <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//             <h2 className="text-2xl font-bold mb-2">Message envoyé !</h2>
//             <p className="text-muted-foreground mb-6">
//               Nous avons bien reçu votre message. Notre équipe vous répondra dans les plus brefs délais.
//             </p>
//             <Button onClick={() => {
//               setIsSubmitted(false);
//               setFormData({ name: "", email: "", subject: "", message: "" });
//             }}>
//               Envoyer un autre message
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="bg-muted/30 py-12">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">Contactez-nous</h1>
//             <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//               Notre équipe de pharmaciens est à votre disposition pour répondre à toutes vos questions
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-12">
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <MessageSquare className="h-5 w-5" />
//               Envoyez-nous un message
//             </CardTitle>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="name">Nom complet *</Label>
//                   <Input
//                     id="name"
//                     value={formData.name}
//                     onChange={(e) => handleInputChange('name', e.target.value)}
//                     placeholder="Votre nom"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="email">Email *</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={(e) => handleInputChange('email', e.target.value)}
//                     placeholder="votre@email.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="subject">Sujet *</Label>
//                 <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="Choisissez un sujet" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="conseil">Demande de conseil</SelectItem>
//                     <SelectItem value="commande">Question sur une commande</SelectItem>
//                     <SelectItem value="produit">Information produit</SelectItem>
//                     <SelectItem value="ordonnance">Renouvellement d'ordonnance</SelectItem>
//                     <SelectItem value="autre">Autre</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="message">Message *</Label>
//                 <Textarea
//                   id="message"
//                   value={formData.message}
//                   onChange={(e) => handleInputChange('message', e.target.value)}
//                   placeholder="Décrivez votre demande en détail..."
//                   rows={6}
//                   required
//                 />
//               </div>

//               <Button 
//                 type="submit" 
//                 size="lg" 
//                 className="w-full" 
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   "Envoi en cours..."
//                 ) : (
//                   <>
//                     <Send className="h-4 w-4 mr-2" />
//                     Envoyer le message
//                   </>
//                 )}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }



// frontend/src/pages/Contact.jsx
import React, { useState } from "react";
import pharmacyService from "../services/pharmacyService";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Le nom est requis.";
    if (!formData.email.trim()) {
      errs.email = "L'email est requis.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errs.email = "Email invalide.";
    }
    if (!formData.message.trim()) errs.message = "Le message est requis.";
    return errs;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      // Assuming backend has a contact message endpoint
      await pharmacyService.sendContactMessage(formData);
      setSubmitStatus("Votre message a été envoyé avec succès.");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center">Contactez-nous</h2>
      {submitStatus && (
        <p
          className={`mb-4 text-center font-medium ${
            submitStatus.includes("succès") ? "text-green-600" : "text-red-600"
          }`}
        >
          {submitStatus}
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">
            Nom complet
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block mb-1 font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring resize-none ${
              errors.message ? "border-red-500" : "border-gray-300"
            }`}
            value={formData.message}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default Contact;