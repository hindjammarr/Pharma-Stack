import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, ShoppingCart, User } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-xl font-bold">
              PharmaPlus
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
              Accueil
            </Link>
            <Link to="/produits" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
              Produits
            </Link>
            <Link to="/services" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
              Services
            </Link>
            <Link to="/contact" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="hover:bg-primary-foreground hover:text-primary p-2 rounded-md">
                  <ShoppingCart size={20} />
                </Link>
                {user.role === 'admin' ? (
                  <>
                    <Link to="/dashboard" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/orders" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
                      Mes Commandes
                    </Link>
                    <Link to="/account" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
                      <User size={20} />
                    </Link>
                  </>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-destructive text-destructive-foreground px-4 py-2 rounded-md hover:bg-destructive/90"
                >
                  Déconnexion
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="hover:bg-primary-foreground hover:text-primary px-3 py-2 rounded-md">
                  Connexion
                </Link>
                <Link to="/signup" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90">
                  Inscription
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-primary-foreground hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                Accueil
              </Link>
              <Link to="/produits" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                Produits
              </Link>
              <Link to="/services" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                Services
              </Link>
              <Link to="/contact" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                Contact
              </Link>

              {user ? (
                <>
                  <Link to="/cart" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                    Panier
                  </Link>
                  {user.role === 'admin' ? (
                    <Link to="/dashboard" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                      Dashboard
                    </Link>
                  ) : (
                    <>
                      <Link to="/orders" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                        Mes Commandes
                      </Link>
                      <Link to="/account" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                        Mon Compte
                      </Link>
                    </>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-primary-foreground hover:text-primary">
                    Connexion
                  </Link>
                  <Link to="/signup" className="block px-3 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar