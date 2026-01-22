'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Service {
  id: number
  name: string
  price: number
  icon: string
}

const services: Service[] = [
  { id: 1, name: 'Troca de Tela', price: 299.90, icon: '📱' },
  { id: 2, name: 'Troca de Bateria', price: 149.90, icon: '🔋' },
  { id: 3, name: 'Reparo de Botões', price: 89.90, icon: '🔘' },
  { id: 4, name: 'Limpeza Interna', price: 79.90, icon: '🧹' },
  { id: 5, name: 'Troca de Câmera', price: 199.90, icon: '📷' },
  { id: 6, name: 'Reparo de Áudio', price: 129.90, icon: '🔊' },
  { id: 7, name: 'Troca de Conector', price: 99.90, icon: '🔌' },
  { id: 8, name: 'Atualização Software', price: 59.90, icon: '⚙️' },
  { id: 9, name: 'Desbloqueio', price: 89.90, icon: '🔓' },
  { id: 10, name: 'Película de Vidro', price: 39.90, icon: '🛡️' },
  { id: 11, name: 'Capinha Proteção', price: 49.90, icon: '📦' },
  { id: 12, name: 'Diagnóstico Geral', price: 0, icon: '🔍' },
]

export default function Home() {
  const [selectedServices, setSelectedServices] = useState<number[]>([])

  const toggleService = (id: number) => {
    setSelectedServices(prev =>
      prev.includes(id)
        ? prev.filter(serviceId => serviceId !== id)
        : [...prev, id]
    )
  }

  const getTotal = () => {
    return selectedServices.reduce((total, id) => {
      const service = services.find(s => s.id === id)
      return total + (service?.price || 0)
    }, 0)
  }

  const getSelectedServicesDetails = () => {
    return selectedServices.map(id => services.find(s => s.id === id)).filter(Boolean) as Service[]
  }

  const handleFinish = () => {
    if (selectedServices.length === 0) {
      alert('Por favor, selecione pelo menos um serviço!')
      return
    }
    alert(`Serviços selecionados!\n\nTotal: R$ ${getTotal().toFixed(2)}\n\nUm atendente irá chamá-lo em breve.`)
    setSelectedServices([])
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🚀</span>
          <h1>Space Phone</h1>
        </div>
        <p className={styles.subtitle}>Assistência Técnica Especializada</p>
      </header>

      <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.servicesSection}>
            <h2 className={styles.sectionTitle}>Selecione os Serviços</h2>
            <div className={styles.servicesGrid}>
              {services.map(service => (
                <button
                  key={service.id}
                  className={`${styles.serviceCard} ${
                    selectedServices.includes(service.id) ? styles.selected : ''
                  }`}
                  onClick={() => toggleService(service.id)}
                >
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.servicePrice}>
                    {service.price === 0 ? 'GRÁTIS' : `R$ ${service.price.toFixed(2)}`}
                  </p>
                  {selectedServices.includes(service.id) && (
                    <div className={styles.checkmark}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.cart}>
              <h2 className={styles.cartTitle}>Resumo</h2>
              
              {selectedServices.length === 0 ? (
                <p className={styles.emptyCart}>Nenhum serviço selecionado</p>
              ) : (
                <>
                  <div className={styles.cartItems}>
                    {getSelectedServicesDetails().map(service => (
                      <div key={service.id} className={styles.cartItem}>
                        <span className={styles.cartItemIcon}>{service.icon}</span>
                        <div className={styles.cartItemInfo}>
                          <span className={styles.cartItemName}>{service.name}</span>
                          <span className={styles.cartItemPrice}>
                            {service.price === 0 ? 'Grátis' : `R$ ${service.price.toFixed(2)}`}
                          </span>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => toggleService(service.id)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className={styles.total}>
                    <span>Total:</span>
                    <span className={styles.totalValue}>R$ {getTotal().toFixed(2)}</span>
                  </div>
                </>
              )}

              <button
                className={styles.finishBtn}
                onClick={handleFinish}
                disabled={selectedServices.length === 0}
              >
                Finalizar Atendimento
              </button>
            </div>
          </aside>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Toque nos serviços desejados • Atendimento rápido e profissional</p>
      </footer>
    </div>
  )
}
