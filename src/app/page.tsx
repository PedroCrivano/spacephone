'use client'

import { useState } from 'react'
import styles from './page.module.css'

interface Service {
  id: number
  name: string
  price: number
  icon: string
  category: string
  hasOptions?: boolean
}

interface ProductOption {
  id: string
  name: string
  price: number
  image: string
  description: string
}

interface SelectedService {
  serviceId: number
  model: string
  optionId?: string
  optionName?: string
}

interface CustomerData {
  id: string
  name: string
  phone: string
  cpf: string
  deviceModel: string
  timestamp: string
}

interface SavedCustomer {
  name: string
  cpf: string
  phone: string
  lastDeviceModel: string
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

const capinhaOptions: ProductOption[] = [
  {
    id: 'cap-silicone-preto',
    name: 'Capinha Silicone Preta',
    price: 39.90,
    image: '🖤',
    description: 'Proteção básica em silicone'
  },
  {
    id: 'cap-silicone-transparente',
    name: 'Capinha Silicone Transparente',
    price: 39.90,
    image: '🧊',
    description: 'Silicone transparente para mostrar o aparelho'
  },
  {
    id: 'cap-silicone-colorida',
    name: 'Capinha Silicone Colorida',
    price: 44.90,
    image: '🌈',
    description: 'Várias cores disponíveis'
  },
  {
    id: 'cap-couro',
    name: 'Capinha Couro Premium',
    price: 89.90,
    image: '📖',
    description: 'Couro sintético de alta qualidade'
  },
  {
    id: 'cap-militar',
    name: 'Capinha Anti-Impacto Militar',
    price: 79.90,
    image: '🛡️',
    description: 'Máxima proteção contra quedas'
  },
  {
    id: 'cap-magnetica',
    name: 'Capinha Magnética',
    price: 69.90,
    image: '🧲',
    description: 'Compatível com carregador MagSafe'
  },
]

const services: Service[] = [
  // REPAROS
  { id: 1, name: 'Troca de Tela', price: 299.90, icon: '📱', category: 'Reparos' },
  { id: 2, name: 'Troca de Bateria', price: 149.90, icon: '🔋', category: 'Reparos' },
  { id: 5, name: 'Troca de Câmera', price: 199.90, icon: '📷', category: 'Reparos' },
  { id: 3, name: 'Reparo de Botões', price: 89.90, icon: '🔘', category: 'Reparos' },
  { id: 6, name: 'Reparo de Áudio', price: 129.90, icon: '🔊', category: 'Reparos' },
  { id: 7, name: 'Troca de Conector', price: 99.90, icon: '🔌', category: 'Reparos' },
  
  // PROTEÇÃO
  { id: 10, name: 'Película de Vidro', price: 39.90, icon: '🛡️', category: 'Proteção' },
  { id: 11, name: 'Capinha Proteção', price: 49.90, icon: '📦', category: 'Proteção', hasOptions: true },
  
  // ACESSÓRIOS
  { id: 13, name: 'Carregadores', price: 79.90, icon: '⚡', category: 'Acessórios' },
  
  // SERVIÇOS
  { id: 4, name: 'Limpeza Interna', price: 79.90, icon: '🧹', category: 'Serviços' },
  { id: 8, name: 'Atualização Software', price: 59.90, icon: '⚙️', category: 'Serviços' },
  { id: 9, name: 'Desbloqueio', price: 89.90, icon: '🔓', category: 'Serviços' },
  { id: 12, name: 'Diagnóstico Geral', price: 0, icon: '🔍', category: 'Serviços' },
]

// Nova estrutura de categorias principais
interface CategoryItem {
  id: string
  name: string
  icon: string
  color: string
  items: Array<{
    id: number
    name: string
    price: number
    icon: string
  }>
}

interface Promotion {
  id: string
  title: string
  image: string
  discount?: string
}

const mainCategories: CategoryItem[] = [
  {
    id: 'manutencao',
    name: 'Manutenção',
    icon: '🔧',
    color: '#ff6b6b',
    items: [
      { id: 1, name: 'Troca de Tela', price: 299.90, icon: '📱' },
      { id: 2, name: 'Troca de Bateria', price: 149.90, icon: '🔋' },
      { id: 7, name: 'Troca de Conector', price: 99.90, icon: '🔌' },
      { id: 5, name: 'Troca de Câmera', price: 199.90, icon: '📷' },
      { id: 3, name: 'Reparo de Botões', price: 89.90, icon: '🔘' },
      { id: 6, name: 'Reparo de Áudio', price: 129.90, icon: '🔊' },
    ]
  },
  {
    id: 'eletronicos',
    name: 'Eletrônicos',
    icon: '🎧',
    color: '#0066ff',
    items: [
      { id: 20, name: 'Fones', price: 89.90, icon: '🎧' },
      { id: 21, name: 'Carregadores', price: 79.90, icon: '⚡' },
      { id: 22, name: 'Caixas de Som', price: 199.90, icon: '🔊' },
      { id: 23, name: 'Carregadores Portáteis', price: 129.90, icon: '🔋' },
      { id: 24, name: 'Cabos de Carregamento', price: 39.90, icon: '🔌' },
    ]
  },
  {
    id: 'blindagem',
    name: 'Blindagem',
    icon: '🛡️',
    color: '#00cc88',
    items: [
      { id: 30, name: 'Capinhas Resistentes', price: 79.90, icon: '🛡️' },
      { id: 31, name: 'Capinhas de Silicone', price: 39.90, icon: '📦' },
      { id: 32, name: 'Películas', price: 39.90, icon: '✨' },
    ]
  }
]

const promotions: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Fones Premium',
    image: '🎧',
    discount: '-20%'
  },
  {
    id: 'promo-2',
    title: 'Capinhas à Prova d\'Água',
    image: '🛡️',
    discount: '-15%'
  },
  {
    id: 'promo-3',
    title: 'Carregadores Rápidos',
    image: '⚡',
    discount: '-25%'
  },
  {
    id: 'promo-4',
    title: 'Películas de Vidro',
    image: '✨',
    discount: '-10%'
  },
  {
    id: 'promo-5',
    title: 'Kit Completo',
    image: '📦',
    discount: '-30%'
  }
]

export default function Home() {
  // Screen control states
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'phone-login' | 'register' | 'services'>('welcome')
  const [isGuestMode, setIsGuestMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([])
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [showProductOptions, setShowProductOptions] = useState(false)
  const [currentProductService, setCurrentProductService] = useState<Service | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState<string | null>(null)
  const [selectedProductsInModal, setSelectedProductsInModal] = useState<number[]>([])
  
  // Customer registration states
  const [isRegistered, setIsRegistered] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [customerData, setCustomerData] = useState<CustomerData>({
    id: '',
    name: '',
    phone: '',
    cpf: '',
    deviceModel: '',
    timestamp: ''
  })
  
  // Form states
  const [formName, setFormName] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formCpf, setFormCpf] = useState('')
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

  const formatCpf = (value: string) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11)
    
    if (numbers.length <= 3) {
      return numbers
    } else if (numbers.length <= 6) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3)}`
    } else if (numbers.length <= 9) {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`
    } else {
      return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9)}`
    }
  }

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCpf(e.target.value)
    setFormCpf(formatted)
  }

  const handleLoginWithPhone = () => {
    setCurrentScreen('phone-login')
  }

  const handleGuestAccess = () => {
    setIsGuestMode(true)
    setCurrentScreen('register')
  }

  const handlePhoneLogin = () => {
    if (!formPhone.trim()) {
      alert('Por favor, informe seu número de telefone!')
      return
    }

    // Buscar cliente salvo no localStorage
    try {
      const savedCustomers = localStorage.getItem('spacephone_customers')
      if (savedCustomers) {
        const customers: SavedCustomer[] = JSON.parse(savedCustomers)
        const cleanPhone = formPhone.replace(/\D/g, '')
        const existingCustomer = customers.find(c => c.phone.replace(/\D/g, '') === cleanPhone)

        if (existingCustomer) {
          // Cliente encontrado - preenche automaticamente
          setFormName(existingCustomer.name)
          setFormCpf(existingCustomer.cpf)
          setFormDeviceModel(existingCustomer.lastDeviceModel)
          setCurrentScreen('register')
        } else {
          // Cliente novo - vai para tela de cadastro
          setCurrentScreen('register')
        }
      } else {
        setCurrentScreen('register')
      }
    } catch (error) {
      console.error('Erro ao verificar cliente:', error)
      setCurrentScreen('register')
    }
  }

  const toggleService = (service: Service) => {
    // Se o serviço tem opções de produtos, abre o modal de opções
    if (service.hasOptions) {
      setCurrentProductService(service)
      setShowProductOptions(true)
      return
    }
    
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

  const handleProductOptionSelect = (option: ProductOption) => {
    if (!currentProductService) return
    
    // Adiciona o serviço com a opção específica selecionada
    setSelectedServices(prev => [...prev, {
      serviceId: currentProductService.id,
      model: customerData.deviceModel,
      optionId: option.id,
      optionName: option.name
    }])
    
    // Fecha o modal de opções
    setShowProductOptions(false)
    setCurrentProductService(null)
  }

  const removeService = (index: number) => {
    setSelectedServices(prev => prev.filter((_, i) => i !== index))
  }

  const handleStartService = () => {
    if (!formName.trim() || !formPhone.trim() || !formDeviceModel) {
      alert('Por favor, preencha todos os campos!')
      return
    }
    
    // Se não for modo convidado e não tiver CPF, solicita
    if (!isGuestMode && !formCpf.trim()) {
      alert('Por favor, informe seu CPF!')
      return
    }
    
    const customerId = `CLT-${Date.now()}`
    const timestamp = new Date().toISOString()
    
    const newCustomerData: CustomerData = {
      id: customerId,
      name: formName.trim(),
      phone: formPhone.trim(),
      cpf: formCpf.trim(),
      deviceModel: formDeviceModel,
      timestamp
    }
    
    setCustomerData(newCustomerData)
    
    // Salvar cliente no localStorage se não for modo convidado
    if (!isGuestMode) {
      try {
        const savedCustomers = localStorage.getItem('spacephone_customers')
        const customers: SavedCustomer[] = savedCustomers ? JSON.parse(savedCustomers) : []
        
        const cleanPhone = formPhone.replace(/\D/g, '')
        const existingIndex = customers.findIndex(c => c.phone.replace(/\D/g, '') === cleanPhone)
        
        const customerToSave: SavedCustomer = {
          name: formName.trim(),
          cpf: formCpf.trim(),
          phone: formPhone.trim(),
          lastDeviceModel: formDeviceModel
        }
        
        if (existingIndex >= 0) {
          customers[existingIndex] = customerToSave
        } else {
          customers.push(customerToSave)
        }
        
        localStorage.setItem('spacephone_customers', JSON.stringify(customers))
      } catch (error) {
        console.error('Erro ao salvar cliente:', error)
      }
    }
    
    setIsRegistered(true)
    setCurrentScreen('services')
    
    console.log('Cliente registrado:', newCustomerData)
  }

  // Função para calcular distância de Levenshtein (fuzzy search)
  const levenshteinDistance = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase()
    const s2 = str2.toLowerCase()
    const lenS1 = s1.length
    const lenS2 = s2.length
    const matrix: number[][] = []

    for (let i = 0; i <= lenS2; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= lenS1; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= lenS2; i++) {
      for (let j = 1; j <= lenS1; j++) {
        if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }

    return matrix[lenS2][lenS1]
  }

  // Função para verificar se um texto é similar ao termo de busca
  const isSimilarMatch = (text: string, searchTerm: string): boolean => {
    if (!searchTerm.trim()) return true
    
    const distance = levenshteinDistance(text, searchTerm)
    const maxDistance = Math.ceil(searchTerm.length * 0.3) // Permite até 30% de diferença
    
    return distance <= maxDistance || text.toLowerCase().includes(searchTerm.toLowerCase())
  }

  const getTotal = () => {
    return selectedServices.reduce((total, selected) => {
      // Se tiver optionId, busca o preço da opção específica
      if (selected.optionId) {
        const option = capinhaOptions.find(opt => opt.id === selected.optionId)
        return total + (option?.price || 0)
      }
      // Senão, usa o preço padrão do serviço
      const service = services.find(s => s.id === selected.serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

  const filteredCategories = mainCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      isSimilarMatch(item.name, searchTerm)
    )
  })).filter(category => category.items.length > 0 || searchTerm === '')

  const getSelectedServicesDetails = () => {
    return selectedServices.map(selected => {
      const service = services.find(s => s.id === selected.serviceId)
      if (!service) return null
      
      // Se tiver opção específica, retorna com o nome e preço da opção
      if (selected.optionId && selected.optionName) {
        const option = capinhaOptions.find(opt => opt.id === selected.optionId)
        return {
          ...service,
          name: selected.optionName,
          price: option?.price || service.price,
          model: selected.model
        }
      }
      
      return { ...service, model: selected.model }
    }).filter(Boolean) as (Service & { model: string })[]
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
    setFormCpf('')
    setFormDeviceModel('')
    setSearchTerm('')
    setCurrentScreen('welcome')
    setIsGuestMode(false)
    setCustomerData({
      id: '',
      name: '',
      phone: '',
      cpf: '',
      deviceModel: '',
      timestamp: ''
    })
  }

  return (
    <div className={styles.container}>
      {/* Welcome Screen - Login Page */}
      {currentScreen === 'welcome' && (
        <div className={styles.welcomeScreen}>
          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeBrand}>SPACE PHONE</h1>
            <div className={styles.welcomeLogo}>📱</div>
            
            <div className={styles.welcomeButtons}>
              <button 
                onClick={handleLoginWithPhone}
                className={styles.loginButton}
              >
                Login com Telefone
              </button>
              <button 
                onClick={handleGuestAccess}
                className={styles.guestButton}
              >
                Entrar sem Login
              </button>
            </div>
          </div>
          <footer className={styles.loginFooter}>
            Ao entrar neste sistema, você concorda em aceitar nossos termos de uso e políticas de privacidade.
          </footer>
        </div>
      )}

      {/* Phone Login Screen */}
      {currentScreen === 'phone-login' && (
        <div className={styles.welcomeScreen}>
          <div className={styles.welcomeContent}>
            <h1 className={styles.welcomeBrand}>SPACE PHONE</h1>
            <h2 className={styles.loginSubtitle}>Digite seu telefone para continuar</h2>
            
            <div className={styles.phoneLoginForm}>
              <input
                type="tel"
                value={formPhone}
                onChange={handlePhoneChange}
                placeholder="(00) 00000-0000"
                className={styles.phoneLoginInput}
              />
              <button 
                onClick={handlePhoneLogin}
                className={styles.continueButton}
              >
                Continuar
              </button>
              <button 
                onClick={() => setCurrentScreen('welcome')}
                className={styles.backButtonSimple}
              >
                Voltar
              </button>
            </div>
          </div>
          <footer className={styles.loginFooter}>
            Ao entrar neste sistema, você concorda em aceitar nossos termos de uso e políticas de privacidade.
          </footer>
        </div>
      )}

      {currentScreen === 'register' && (
      <>
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
              <h2 className={styles.welcomeTitle}>
                {isGuestMode ? 'Acesso como Convidado' : 'Bem-vindo ao Atendimento da Space Phone'}
              </h2>
              <p className={styles.welcomeText}>Por favor, informe seus dados para iniciarmos</p>
              
              <div className={styles.formGroup}>
                <label htmlFor="customer-name" className={styles.formLabel}>
                  Nome Completo
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
                  disabled={!isGuestMode && formPhone !== ''}
                />
              </div>

              {!isGuestMode && (
                <div className={styles.formGroup}>
                  <label htmlFor="customer-cpf" className={styles.formLabel}>
                    CPF
                  </label>
                  <input
                    id="customer-cpf"
                    type="text"
                    value={formCpf}
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    className={styles.formInput}
                  />
                </div>
              )}

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
              
              {isGuestMode && (
                <div className={styles.guestModeWarning}>
                  <p>⚠️ Modo convidado: Seu atendimento não será salvo para acesso futuro</p>
                </div>
              )}
            </div>
          </div>
        </main>
      ) : null}
      <footer className={styles.loginFooter}>
        Ao entrar neste sistema, você concorda em aceitar nossos termos de uso e políticas de privacidade.
      </footer>
      </>
      )}
      
      {currentScreen === 'services' && isFinished && (
        <>
        <header className={styles.header}>
          <div className={styles.logo}>
            <h1>SPACE PHONE</h1>
          </div>
          <p className={styles.subtitle}>Assistência Técnica Especializada</p>
        </header>
        <main className={styles.main}>
          <div className={styles.thankYouContainer}>
            <div className={styles.thankYouCard}>
              <div className={styles.thankYouIcon}>✅</div>
              <h2 className={styles.thankYouTitle}>Obrigado pela Preferência!</h2>
              
              <div className={styles.thankYouMessage}>
                <p>Seu pedido já foi encaminhado para nossos técnicos.</p>
                <p><strong>Dirija-se a um deles para entregar seu dispositivo.</strong></p>
                {isGuestMode && (
                  <p className={styles.guestWarning}>⚠️ Atendimento sem identificação - Não será possível consultar posteriormente</p>
                )}
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
        <footer className={styles.loginFooter}>
          Ao entrar neste sistema, você concorda em aceitar nossos termos de uso e políticas de privacidade.
        </footer>
        </>
      )}
      
      {currentScreen === 'services' && !isFinished && (
        <div className={styles.visualServicesContainer}>
          <header className={styles.visualServicesHeader}>
            <button 
              className={styles.backButtonVisual}
              onClick={handleBackToStart}
            >
              ← Voltar
            </button>
            <h1 className={styles.visualServicesTitle}>Nossos Serviços</h1>
            <div className={styles.headerSpacer}></div>
          </header>

          <div className={styles.visualServicesContent}>
            <div className={styles.servicesHeroSection}>
              <h2 className={styles.servicesHeroTitle}>Seleção de Serviços</h2>
            </div>

            <div className={styles.searchBarContainer}>
              <input
                type="text"
                placeholder="🔍 Buscar serviço..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchTerm('')}
                >
                  ✕
                </button>
              )}
            </div>

            {!searchTerm && (
              <div className={styles.promotionsCarouselContainer}>
                <div className={styles.promotionsScroll}>
                  {promotions.map(promo => (
                    <div key={promo.id} className={styles.promotionCard}>
                      <div className={styles.promotionImage}>{promo.image}</div>
                      {promo.discount && (
                        <div className={styles.promotionDiscount}>{promo.discount}</div>
                      )}
                      <h3 className={styles.promotionTitle}>{promo.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={styles.servicesGridContainer}>
              <div className={styles.mainServicesArea}>
                <div className={styles.categoriesButtonsContainer}>
                  {filteredCategories.map(category => (
                    <div key={category.id} className={styles.categorySection}>
                      <button
                        className={styles.mainCategoryButton}
                        onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                        style={{
                          borderLeftColor: category.color,
                          backgroundColor: expandedCategory === category.id ? 'rgba(0, 217, 163, 0.05)' : '#ffffff'
                        }}
                      >
                        <span className={styles.categoryIcon}>{category.icon}</span>
                        <span className={styles.categoryTitle}>{category.name}</span>
                        <span className={styles.expandIcon}>{expandedCategory === category.id ? '▼' : '▶'}</span>
                      </button>

                      {expandedCategory === category.id && (
                        <div className={styles.categoryItemsContainer}>
                          {category.items.map(item => (
                            <button
                              key={item.id}
                              className={`${styles.categoryItemButton} ${
                                selectedServices.some(s => s.serviceId === item.id) ? styles.selected : ''
                              }`}
                              onClick={() => {
                                const serviceItem: Service = {
                                  id: item.id,
                                  name: item.name,
                                  price: item.price,
                                  icon: item.icon,
                                  category: category.name
                                }
                                toggleService(serviceItem)
                              }}
                            >
                              <span className={styles.itemIcon}>{item.icon}</span>
                              <div className={styles.itemInfo}>
                                <h4>{item.name}</h4>
                                <p>{item.price === 0 ? 'GRÁTIS' : `R$ ${item.price.toFixed(2)}`}</p>
                              </div>
                              {selectedServices.some(s => s.serviceId === item.id) && (
                                <div className={styles.itemCheckmark}>✓</div>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <aside className={styles.cartSidebar}>
                <div className={styles.cart}>
                  <h2 className={styles.cartTitle}>Resumo do Atendimento</h2>
                  
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
          </div>

          <footer className={styles.servicesFooter}>
            <div className={styles.attendanceInfoSmall}>
              <span className={styles.attendanceLabel}>Cliente:</span>
              <span className={styles.attendanceValue}>{customerData.name}</span>
              <span className={styles.attendanceLabel}>Aparelho:</span>
              <span className={styles.attendanceValue}>{customerData.deviceModel}</span>
            </div>
            <p className={styles.footerText}>Ao entrar neste sistema, você concorda em aceitar nossos termos de uso e políticas de privacidade.</p>
          </footer>
        </div>
      )}
      
      {/* Modal de Opções de Produtos */}
      {showProductOptions && currentProductService && (
        <div className={styles.modalOverlay} onClick={() => setShowProductOptions(false)}>
          <div className={styles.productOptionsModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Escolha sua {currentProductService.name}</h2>
              <button 
                className={styles.closeModal}
                onClick={() => setShowProductOptions(false)}
              >
                ✕
              </button>
            </div>
            
            <div className={styles.productOptionsGrid}>
              {capinhaOptions.map(option => (
                <div 
                  key={option.id}
                  className={styles.productOptionCard}
                  onClick={() => handleProductOptionSelect(option)}
                >
                  <div className={styles.productOptionImage}>{option.image}</div>
                  <h3 className={styles.productOptionName}>{option.name}</h3>
                  <p className={styles.productOptionDescription}>{option.description}</p>
                  <p className={styles.productOptionPrice}>R$ {option.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
