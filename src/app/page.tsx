'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Service {
  id: number
  name: string
  price: number
  icon: string
}

interface SelectedService {
  serviceId: number
  model: string
}

interface CustomerData {
  id: string
  name: string
  phone: string
  deviceModel: string
  timestamp: string
}

const phoneModels = [
  'iPhone 17 Pro Max',
  'iPhone 17 Pro',
  'iPhone 17 Air',
  'iPhone 17',
  'iPhone 16 Pro Max',
  'iPhone 16 Pro',
  'iPhone 16 Plus',
  'iPhone 16',
  'iPhone 15 Pro Max',
  'iPhone 15 Pro',
  'iPhone 15 Plus',
  'iPhone 15',
  'iPhone 14 Pro Max',
  'iPhone 14 Pro',
  'iPhone 14 Plus',
  'iPhone 14',
  'iPhone 13 Pro Max',
  'iPhone 13 Pro',
  'iPhone 13',
  'iPhone 13 mini',
  'iPhone 12 Pro Max',
  'iPhone 12 Pro',
  'iPhone 12',
  'iPhone 12 mini',
  'Samsung Galaxy S24 Ultra',
  'Samsung Galaxy S24',
  'Samsung Galaxy S23',
  'Samsung Galaxy A54',
  'Xiaomi 13 Pro',
  'Motorola Edge 40',
  'Outro modelo'
]

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
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  
  // Customer registration states
  const [isRegistered, setIsRegistered] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [customerData, setCustomerData] = useState<CustomerData>({
    id: '',
    name: '',
    phone: '',
    deviceModel: '',
    timestamp: ''
  })
  
  // Form states
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formDeviceModel, setFormDeviceModel] = useState('')

  const formatPhoneNumber = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '')
    
    // Limita a 11 dígitos
    const limited = numbers.slice(0, 11)
    
    // Aplica a formatação
    if (limited.length <= 2) {
      return limited.length > 0 ? `(${limited}` : ''
    } else if (limited.length <= 6) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2)}`
    } else if (limited.length <= 10) {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`
    } else {
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7, 11)}`
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setFormPhone(formatted)
  }

  const toggleService = (service: Service) => {
    const isSelected = selectedServices.some(s => s.serviceId === service.id)
    
    if (isSelected) {
      setSelectedServices(prev => prev.filter(s => s.serviceId !== service.id))
    } else {
      // Use the customer's device model from registration
      setSelectedServices(prev => [...prev, { 
        serviceId: service.id, 
        model: customerData.deviceModel 
      }])
    }
  }

  const removeService = (index: number) => {
    setSelectedServices(prev => prev.filter((_, i) => i !== index))
  }

  const handleStartService = () => {
    if (!formName.trim() || !formPhone.trim() || !formDeviceModel) {
      alert('Por favor, preencha todos os campos!')
      return
    }
    
    const customerId = `CLT-${Date.now()}`
    const timestamp = new Date().toISOString()
    
    const newCustomerData: CustomerData = {
      id: customerId,
      name: formName.trim(),
      phone: formPhone.trim(),
      deviceModel: formDeviceModel,
      timestamp
    }
    
    setCustomerData(newCustomerData)
    setIsRegistered(true)
    
    console.log('Cliente registrado:', newCustomerData)
  }

  const getTotal = () => {
    return selectedServices.reduce((total, selected) => {
      const service = services.find(s => s.id === selected.serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

  const getSelectedServicesDetails = () => {
    return selectedServices.map(selected => {
      const service = services.find(s => s.id === selected.serviceId)
      return service ? { ...service, model: selected.model } : null
    }).filter(Boolean) as (Service & { model: string })[]
  }

  const getFilteredServices = () => {
    if (!searchTerm.trim()) return services
    return services.filter(service => 
      service.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const handleFinish = () => {
    if (selectedServices.length === 0) {
      alert('Por favor, selecione pelo menos um serviço!')
      return
    }
    
    // Save order to localStorage
    const orderData = {
      id: customerData.id,
      customerName: customerData.name,
      customerPhone: customerData.phone,
      deviceModel: customerData.deviceModel,
      services: getSelectedServicesDetails().map(s => ({
        name: s.name,
        price: s.price
      })),
      totalValue: getTotal(),
      additionalNotes: additionalNotes,
      createdAt: customerData.timestamp,
      status: 'pending' as 'pending'
    }
    
    try {
      const existingOrders = localStorage.getItem('spacephone_orders')
      const orders = existingOrders ? JSON.parse(existingOrders) : []
      orders.push(orderData)
      localStorage.setItem('spacephone_orders', JSON.stringify(orders))
    } catch (error) {
      console.error('Erro ao salvar pedido:', error)
    }
    
    setIsFinished(true)
    console.log('Atendimento finalizado:', {
      customer: customerData,
      services: getSelectedServicesDetails(),
      total: getTotal(),
      notes: additionalNotes
    })
  }

  const handleBackToStart = () => {
    setIsFinished(false)
    setIsRegistered(false)
    setSelectedServices([])
    setAdditionalNotes('')
    setFormName('')
    setFormPhone('')
    setFormDeviceModel('')
    setSearchTerm('')
    setCustomerData({
      id: '',
      name: '',
      phone: '',
      deviceModel: '',
      timestamp: ''
    })
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>SPACE PHONE</h1>
        </div>
        <p className={styles.subtitle}>Assistência Técnica Especializada</p>
      </header>

      {!isRegistered ? (
        <main className={styles.main}>
          <div className={styles.welcomeContainer}>
            <div className={styles.welcomeCard}>
              <h2 className={styles.welcomeTitle}>Bem-vindo ao Atendimento</h2>
              <p className={styles.welcomeText}>Por favor, informe seus dados para iniciarmos</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="customer-name" className={styles.formLabel}>
                  Nome 
                </label>
                <input
                  id="customer-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Digite seu nome"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="customer-phone" className={styles.formLabel}>
                  Número de Celular
                </label>
                <input
                  id="customer-phone"
                  type="tel"
                  value={formPhone}
                  onChange={handlePhoneChange}
                  placeholder="(00) 00000-0000"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="device-model" className={styles.formLabel}>
                  Modelo do Aparelho
                </label>
                <select
                  id="device-model"
                  value={formDeviceModel}
                  onChange={(e) => setFormDeviceModel(e.target.value)}
                  className={styles.formSelect}
                >
                  <option value="">Selecione o modelo</option>
                  {phoneModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={handleStartService}
                className={styles.startButton}
              >
                Iniciar Atendimento
              </button>
              
              <div className={styles.customerIdInfo}>
                <p>Seu ID de atendimento será gerado ao iniciar</p>
              </div>
            </div>
          </div>
        </main>
      ) : isFinished ? (
        <main className={styles.main}>
          <div className={styles.thankYouContainer}>
            <div className={styles.thankYouCard}>
              <div className={styles.thankYouIcon}>✅</div>
              <h2 className={styles.thankYouTitle}>Obrigado pela Preferência!</h2>
              
              <div className={styles.thankYouMessage}>
                <p>Seu pedido já foi encaminhado para nossos técnicos.</p>
                <p><strong>Dirija-se a um deles para entregar seu dispositivo.</strong></p>
              </div>

              <div className={styles.orderSummary}>
                <h3>Resumo do Pedido</h3>
                <p><strong>Cliente:</strong> {customerData.name}</p>
                <p><strong>Aparelho:</strong> {customerData.deviceModel}</p>
                <p><strong>Total:</strong> <span className={styles.totalHighlight}>R$ {getTotal().toFixed(2)}</span></p>
              </div>

              <div className={styles.notesSection}>
                <label htmlFor="additional-notes" className={styles.notesLabel}>
                  Caso tenha alguma informação para acrescentar, escreva no espaço abaixo:
                </label>
                <textarea
                  id="additional-notes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Notas adicionais (opcional)..."
                  className={styles.notesTextarea}
                  rows={5}
                />
              </div>

              <button 
                onClick={handleBackToStart}
                className={styles.backToStartButton}
              >
                Voltar à Página Inicial
              </button>
            </div>
          </div>
        </main>
      ) : (
        <main className={styles.main}>
        <div className={styles.content}>
          <section className={styles.servicesSection}>
            <h2 className={styles.sectionTitle}>Selecione os Serviços</h2>
            
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="🔍 Buscar serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button
                  className={styles.clearSearch}
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>

            <div className={styles.servicesGrid}>
              {getFilteredServices().map(service => (
                <button
                  key={service.id}
                  className={`${styles.serviceCard} ${
                    selectedServices.some(s => s.serviceId === service.id) ? styles.selected : ''
                  }`}
                  onClick={() => toggleService(service)}
                >
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <h3 className={styles.serviceName}>{service.name}</h3>
                  <p className={styles.servicePrice}>
                    {service.price === 0 ? 'GRÁTIS' : `R$ ${service.price.toFixed(2)}`}
                  </p>
                  {selectedServices.some(s => s.serviceId === service.id) && (
                    <div className={styles.checkmark}>✓</div>
                  )}
                </button>
              ))}
            </div>
          </section>

          <aside className={styles.sidebar}>
            <div className={styles.cart}>
              <div className={styles.customerInfo}>
                <h3 className={styles.customerInfoTitle}>Atendimento</h3>
                <p className={styles.customerInfoItem}><strong>Cliente:</strong> {customerData.name}</p>
                <p className={styles.customerInfoItem}><strong>Aparelho:</strong> {customerData.deviceModel}</p>
              </div>
              
              <h2 className={styles.cartTitle}>Serviços Selecionados</h2>
              
              {selectedServices.length === 0 ? (
                <p className={styles.emptyCart}>Nenhum serviço selecionado</p>
              ) : (
                <>
                  <div className={styles.cartItems}>
                    {getSelectedServicesDetails().map((service, index) => (
                      <div key={`${service.id}-${index}`} className={styles.cartItem}>
                        <span className={styles.cartItemIcon}>{service.icon}</span>
                        <div className={styles.cartItemInfo}>
                          <span className={styles.cartItemName}>{service.name}</span>
                          <span className={styles.cartItemModel}>{service.model}</span>
                          <span className={styles.cartItemPrice}>
                            {service.price === 0 ? 'Grátis' : `R$ ${service.price.toFixed(2)}`}
                          </span>
                        </div>
                        <button
                          className={styles.removeBtn}
                          onClick={() => removeService(index)}
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
        
      <footer className={styles.footer}>
        <p>Toque nos serviços desejados • Atendimento rápido e profissional</p>
      </footer>
      </main>
      )}
    </div>
  )
}
