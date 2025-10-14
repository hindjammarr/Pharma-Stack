import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">PharmaCare</h3>
            <p className="text-sm">
              Votre pharmacie de confiance pour tous vos besoins en santé et bien-être.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
              <li><Link to="/produits" className="hover:text-primary">Produits</Link></li>
              <li><Link to="/services" className="hover:text-primary">Services</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 01 23 45 67 89</li>
              <li>📧 contact@pharmaplus.fr</li>
              <li>📍 123 Rue de la Santé, 75000 Paris</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Horaires</h4>
            <ul className="space-y-2 text-sm">
              <li>Lundi - Vendredi: 8h00 - 19h00</li>
              <li>Samedi: 8h00 - 12h00</li>
              <li>Dimanche: Fermé</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-sm">
          <p>© 2024 PharmaCare. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer