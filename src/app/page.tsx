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
  // iPhone - Todos os modelos
  'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17 Air', 'iPhone 17',
  'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
  'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
  'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
  'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
  'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini',
  'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
  'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
  'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7',
  'iPhone 6s Plus', 'iPhone 6s', 'iPhone 6 Plus', 'iPhone 6',
  'iPhone SE (2022)', 'iPhone SE (2020)', 'iPhone SE',
  
  // Samsung Galaxy S (Todos)
  'Samsung Galaxy S24 Ultra', 'Samsung Galaxy S24+', 'Samsung Galaxy S24',
  'Samsung Galaxy S23 Ultra', 'Samsung Galaxy S23+', 'Samsung Galaxy S23', 'Samsung Galaxy S23 FE',
  'Samsung Galaxy S22 Ultra', 'Samsung Galaxy S22+', 'Samsung Galaxy S22',
  'Samsung Galaxy S21 Ultra', 'Samsung Galaxy S21+', 'Samsung Galaxy S21', 'Samsung Galaxy S21 FE',
  'Samsung Galaxy S20 Ultra', 'Samsung Galaxy S20+', 'Samsung Galaxy S20', 'Samsung Galaxy S20 FE',
  'Samsung Galaxy S10+', 'Samsung Galaxy S10', 'Samsung Galaxy S10e', 'Samsung Galaxy S10 5G',
  'Samsung Galaxy S9+', 'Samsung Galaxy S9',
  'Samsung Galaxy S8+', 'Samsung Galaxy S8',
  'Samsung Galaxy S7 Edge', 'Samsung Galaxy S7',
  
  // Samsung Galaxy A (Todos)
  'Samsung Galaxy A54', 'Samsung Galaxy A53', 'Samsung Galaxy A52', 'Samsung Galaxy A51', 'Samsung Galaxy A50',
  'Samsung Galaxy A34', 'Samsung Galaxy A33', 'Samsung Galaxy A32', 'Samsung Galaxy A31', 'Samsung Galaxy A30',
  'Samsung Galaxy A24', 'Samsung Galaxy A23', 'Samsung Galaxy A22', 'Samsung Galaxy A21s', 'Samsung Galaxy A20',
  'Samsung Galaxy A14', 'Samsung Galaxy A13', 'Samsung Galaxy A12', 'Samsung Galaxy A11', 'Samsung Galaxy A10',
  'Samsung Galaxy A73', 'Samsung Galaxy A72', 'Samsung Galaxy A71', 'Samsung Galaxy A70',
  'Samsung Galaxy A04', 'Samsung Galaxy A03', 'Samsung Galaxy A02',
  
  // Samsung Galaxy J (Todos)
  'Samsung Galaxy J8', 'Samsung Galaxy J7 Prime', 'Samsung Galaxy J7 Pro', 'Samsung Galaxy J7', 'Samsung Galaxy J7 Neo',
  'Samsung Galaxy J6', 'Samsung Galaxy J5 Prime', 'Samsung Galaxy J5 Pro', 'Samsung Galaxy J5',
  'Samsung Galaxy J4', 'Samsung Galaxy J3', 'Samsung Galaxy J2 Prime', 'Samsung Galaxy J2', 'Samsung Galaxy J1',
  
  // Xiaomi (Todos os principais)
  'Xiaomi 14 Ultra', 'Xiaomi 14 Pro', 'Xiaomi 14',
  'Xiaomi 13 Ultra', 'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 13 Lite',
  'Xiaomi 12 Pro', 'Xiaomi 12', 'Xiaomi 12 Lite', 'Xiaomi 12X',
  'Xiaomi 11 Ultra', 'Xiaomi 11 Pro', 'Xiaomi 11', 'Xiaomi 11 Lite',
  'Xiaomi Mi 10 Ultra', 'Xiaomi Mi 10 Pro', 'Xiaomi Mi 10', 'Xiaomi Mi 10 Lite',
  'Xiaomi Mi 9', 'Xiaomi Mi 9 SE', 'Xiaomi Mi 8', 'Xiaomi Mi A3', 'Xiaomi Mi A2',
  'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13',
  'Redmi Note 12 Pro+', 'Redmi Note 12 Pro', 'Redmi Note 12',
  'Redmi Note 11 Pro', 'Redmi Note 11', 'Redmi Note 11S',
  'Redmi Note 10 Pro', 'Redmi Note 10', 'Redmi Note 10S',
  'Redmi Note 9 Pro', 'Redmi Note 9', 'Redmi Note 9S',
  'Redmi Note 8 Pro', 'Redmi Note 8', 'Redmi Note 7',
  'Redmi 13C', 'Redmi 12C', 'Redmi 10', 'Redmi 9', 'Redmi 9A', 'Redmi 9C',
  'POCO F5 Pro', 'POCO F5', 'POCO F4', 'POCO F3', 'POCO X6 Pro', 'POCO X5 Pro', 'POCO X4 Pro',
  
  // Motorola (Todos os principais)
  'Motorola Edge 50 Pro', 'Motorola Edge 50', 'Motorola Edge 40 Pro', 'Motorola Edge 40', 'Motorola Edge 30 Ultra',
  'Motorola Edge 30 Pro', 'Motorola Edge 30', 'Motorola Edge 20 Pro', 'Motorola Edge 20',
  'Moto G84', 'Moto G73', 'Moto G72', 'Moto G71', 'Moto G60', 'Moto G54', 'Moto G53', 'Moto G52',
  'Moto G51', 'Moto G50', 'Moto G42', 'Moto G41', 'Moto G40', 'Moto G32', 'Moto G31', 'Moto G30',
  'Moto G24', 'Moto G23', 'Moto G22', 'Moto G20', 'Moto G14', 'Moto G13', 'Moto G10',
  'Moto G200', 'Moto G100', 'Moto G9 Plus', 'Moto G9 Play', 'Moto G8 Power', 'Moto G8 Plus', 'Moto G8',
  'Moto E40', 'Moto E32', 'Moto E30', 'Moto E22', 'Moto E20', 'Moto E13', 'Moto E7 Plus', 'Moto E7',
  'Motorola Razr 40 Ultra', 'Motorola Razr 40', 'Motorola Razr 2022',
  'Motorola One Fusion', 'Motorola One Vision', 'Motorola One Action',
  
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
  const [modelSearchTerm, setModelSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [showProductOptions, setShowProductOptions] = useState(false)
  const [currentProductService, setCurrentProductService] = useState<Service | null>(null)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState<string | null>(null)
  const [selectedProductsInModal, setSelectedProductsInModal] = useState<number[]>([])
  const [showCartModal, setShowCartModal] = useState(false)
  const [showVirtualKeyboard, setShowVirtualKeyboard] = useState(false)
  const [activeInputField, setActiveInputField] = useState<string | null>(null)
  const [keyboardInputValue, setKeyboardInputValue] = useState('')
  const [showGuestRegistrationModal, setShowGuestRegistrationModal] = useState(false)
  const [showGuestDeviceModal, setShowGuestDeviceModal] = useState(false)
  const [pendingCategoryId, setPendingCategoryId] = useState<string | null>(null)
  
  // Customer registration states
  const [isRegistered, setIsRegistered] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [additionalNotes, setAdditionalNotes] = useState('')
  const [rating, setRating] = useState(0)
  const [ratingComment, setRatingComment] = useState('')
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [showNumericKeypad, setShowNumericKeypad] = useState(false)
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

  const handleNumericKeypadPress = (digit: string) => {
    const currentNumbers = formPhone.replace(/\D/g, '')
    if (digit === 'backspace') {
      const newNumbers = currentNumbers.slice(0, -1)
      setFormPhone(formatPhoneNumber(newNumbers))
    } else if (currentNumbers.length < 11) {
      const newNumbers = currentNumbers + digit
      setFormPhone(formatPhoneNumber(newNumbers))
    }
  }

  const handleVirtualKeyPress = (key: string) => {
    if (key === 'backspace') {
      setKeyboardInputValue(prev => prev.slice(0, -1))
    } else if (key === 'space') {
      setKeyboardInputValue(prev => prev + ' ')
    } else if (key === 'enter') {
      handleVirtualKeyboardConfirm()
    } else if (key === 'clear') {
      setKeyboardInputValue('')
    } else {
      setKeyboardInputValue(prev => prev + key)
    }
  }

  const handleVirtualKeyboardConfirm = () => {
    if (activeInputField === 'name') {
      setFormName(keyboardInputValue)
    } else if (activeInputField === 'cpf') {
      setFormCpf(keyboardInputValue)
    } else if (activeInputField === 'search') {
      setSearchTerm(keyboardInputValue)
    } else if (activeInputField === 'modelSearch') {
      setModelSearchTerm(keyboardInputValue)
    } else if (activeInputField === 'notes') {
      setAdditionalNotes(keyboardInputValue)
    }
    setShowVirtualKeyboard(false)
    setActiveInputField(null)
    setKeyboardInputValue('')
  }

  const closeVirtualKeyboard = () => {
    setShowVirtualKeyboard(false)
    setActiveInputField(null)
    setKeyboardInputValue('')
  }

  const openVirtualKeyboard = (field: string, currentValue: string) => {
    setActiveInputField(field)
    setKeyboardInputValue(currentValue)
    setShowVirtualKeyboard(true)
  }

  const handleCategoryClick = (categoryId: string) => {
    // Se for convidado e não tiver modelo definido, mostrar modal
    if (isGuestMode && !customerData.deviceModel) {
      setPendingCategoryId(categoryId)
      setShowGuestDeviceModal(true)
      return
    }
    
    // Caso contrário, expandir normalmente
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  const handleGuestDeviceSelect = () => {
    if (!formDeviceModel) {
      alert('Por favor, selecione um modelo de aparelho!')
      return
    }
    
    // Atualizar dados do cliente com o modelo
    const updatedCustomerData = {
      ...customerData,
      deviceModel: formDeviceModel
    }
    setCustomerData(updatedCustomerData)
    
    // Fechar modal e expandir a categoria
    setShowGuestDeviceModal(false)
    if (pendingCategoryId) {
      setExpandedCategory(pendingCategoryId)
      setPendingCategoryId(null)
    }
  }

  const handleLoginWithPhone = () => {
    setCurrentScreen('phone-login')
    setShowNumericKeypad(true)
  }

  const handleGuestAccess = () => {
    setIsGuestMode(true)
    
    // Criar dados temporários do cliente convidado
    const guestData = {
      id: Date.now().toString(),
      name: 'Convidado',
      phone: '',
      cpf: '',
      deviceModel: '',
      timestamp: new Date().toISOString()
    }
    setCustomerData(guestData)
    setIsRegistered(true)
    setCurrentScreen('services')
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
    
    // Se for modo convidado, sempre mostrar modal de registro para confirmar dados
    if (isGuestMode) {
      setShowGuestRegistrationModal(true)
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

  const handleGuestRegistrationSubmit = () => {
    // Validar campos
    if (!formName.trim() || !formPhone.trim() || !formCpf.trim() || !formDeviceModel) {
      alert('Por favor, preencha todos os campos obrigatórios!')
      return
    }

    // Atualizar dados do cliente IMEDIATAMENTE
    const updatedCustomerData = {
      id: customerData.id || Date.now().toString(),
      name: formName,
      phone: formPhone,
      cpf: formCpf,
      deviceModel: formDeviceModel,
      timestamp: customerData.timestamp || new Date().toISOString()
    }
    
    // Salvar pedido
    const orderData = {
      id: updatedCustomerData.id,
      customerName: formName,
      customerPhone: formPhone,
      deviceModel: formDeviceModel,
      services: getSelectedServicesDetails().map(s => ({
        name: s.name,
        price: s.price
      })),
      totalValue: getTotal(),
      additionalNotes: additionalNotes,
      createdAt: updatedCustomerData.timestamp,
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

    // Salvar cliente no localStorage (sempre, não apenas com CPF)
    try {
      const existingCustomers = localStorage.getItem('spacephone_customers')
      const customers = existingCustomers ? JSON.parse(existingCustomers) : []
      customers.push({
        phone: formPhone,
        name: formName,
        cpf: formCpf || '',
        lastDeviceModel: formDeviceModel
      })
      localStorage.setItem('spacephone_customers', JSON.stringify(customers))
    } catch (error) {
      console.error('Erro ao salvar cliente:', error)
    }

    // Atualizar todos os estados na ordem correta
    setCustomerData(updatedCustomerData)
    setIsGuestMode(false) // Agora é um usuário registrado
    setIsRegistered(true) // Garantir que está registrado
    setCurrentScreen('services') // Garantir que está na tela de serviços
    setShowGuestRegistrationModal(false)
    setShowCartModal(false)
    setIsFinished(true)
    
    console.log('Convidado registrado com sucesso:', {
      customerData: updatedCustomerData,
      isFinished: true,
      currentScreen: 'services',
      isRegistered: true
    })
  }

  const handleSubmitRating = () => {
    // Salvar avaliação no localStorage
    try {
      const ratingData = {
        customerName: customerData.name,
        rating: rating,
        comment: ratingComment,
        timestamp: new Date().toISOString()
      }
      
      const existingRatings = localStorage.getItem('spacephone_ratings')
      const ratings = existingRatings ? JSON.parse(existingRatings) : []
      ratings.push(ratingData)
      localStorage.setItem('spacephone_ratings', JSON.stringify(ratings))
      
      setRatingSubmitted(true)
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error)
    }
  }

  const handleBackToStart = () => {
    setIsFinished(false)
    setIsRegistered(false)
    setSelectedServices([])
    setAdditionalNotes('')
    setRating(0)
    setRatingComment('')
    setRatingSubmitted(false)
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
            <div className={styles.welcomeHeader}>
              <div className={styles.welcomePromoBox}>
                <p className={styles.welcomePromoMain}>ATENDIMENTO VIRTUAL</p>
                <p className={styles.welcomePromoDiscount}>DESCONTO!!!</p>
              </div>
              <div className={styles.welcomeLogoCircle}>logo</div>
            </div>
            
            <div className={styles.welcomeButtonsClean}>
              <button 
                onClick={handleLoginWithPhone}
                className={styles.loginButtonClean}
              >
                Login com Telefone
              </button>
              <button 
                onClick={handleGuestAccess}
                className={styles.guestButtonClean}
              >
                Continuar como Convidado
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
                onFocus={() => setShowNumericKeypad(true)}
                placeholder="(00) 00000-0000"
                className={styles.phoneLoginInput}
                readOnly
              />
              <button 
                onClick={handlePhoneLogin}
                className={styles.continueButton}
              >
                Continuar
              </button>
              <button 
                onClick={() => {
                  setCurrentScreen('welcome')
                  setShowNumericKeypad(false)
                }}
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

      {/* Numeric Keypad Modal */}
      {showNumericKeypad && (
        <div className={styles.keypadOverlay}>
          <div className={styles.keypadCard}>
            <button 
              className={styles.keypadClose}
              onClick={() => setShowNumericKeypad(false)}
            >
              ✕
            </button>
            <div className={styles.keypadDisplay}>
              {formPhone || '(00) 00000-0000'}
            </div>
            <div className={styles.keypadGrid}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button 
                  key={num}
                  className={styles.keypadButton}
                  onClick={() => handleNumericKeypadPress(num.toString())}
                >
                  {num}
                </button>
              ))}
              <button 
                className={`${styles.keypadButton} ${styles.keypadButtonDelete}`}
                onClick={() => handleNumericKeypadPress('backspace')}
              >
                ⌫
              </button>
              <button 
                className={styles.keypadButton}
                onClick={() => handleNumericKeypadPress('0')}
              >
                0
              </button>
              <button 
                className={`${styles.keypadButton} ${styles.keypadButtonConfirm}`}
                onClick={() => {
                  handlePhoneLogin()
                  setShowNumericKeypad(false)
                }}
              >
                ✓
              </button>
            </div>
          </div>
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
                  onFocus={() => openVirtualKeyboard('name', formName)}
                  readOnly
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
                    onFocus={() => openVirtualKeyboard('cpf', formCpf)}
                    readOnly
                    placeholder="000.000.000-00"
                    className={styles.formInput}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="device-model" className={styles.formLabel}>
                  Modelo do Aparelho
                </label>
                {!formDeviceModel ? (
                  <>
                    <input
                      type="text"
                      value={modelSearchTerm}
                      onFocus={() => openVirtualKeyboard('modelSearch', modelSearchTerm)}
                      readOnly
                      placeholder="Digite para pesquisar o modelo..."
                      className={styles.formInput}
                    />
                    {modelSearchTerm && (
                      <div className={styles.modelDropdown}>
                        {phoneModels
                          .filter(model => 
                            model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                          )
                          .slice(0, 10)
                          .map(model => (
                            <div
                              key={model}
                              className={styles.modelOption}
                              onClick={() => {
                                setFormDeviceModel(model)
                                setModelSearchTerm('')
                              }}
                            >
                              {model}
                            </div>
                          ))}
                        {phoneModels.filter(model => 
                          model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                        ).length === 0 && (
                          <div className={styles.modelNoResults}>Nenhum modelo encontrado</div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.selectedModel}>
                    <span>{formDeviceModel}</span>
                    <button
                      type="button"
                      className={styles.clearModelBtn}
                      onClick={() => {
                        setFormDeviceModel('')
                        setModelSearchTerm('')
                      }}
                    >
                      ✕
                    </button>
                  </div>
                )}
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
              <h2 className={styles.thankYouTitle}>Obrigado por escolher a Space Phone</h2>
              <p className={styles.thankYouSubtitle}>Nossa equipe está pronta para lhe atender com qualidade e rapidez</p>
              
              <div className={styles.orderSummary}>
                <h3>Resumo do Pedido</h3>
                <p><strong>Cliente:</strong> {customerData.name}</p>
                <p><strong>Aparelho:</strong> {customerData.deviceModel}</p>
                <div className={styles.orderServices}>
                  <strong>Serviços:</strong>
                  <ul>
                    {getSelectedServicesDetails().filter(Boolean).map((service, index) => (
                      <li key={index}>
                        {service.icon} {service.name} - {service.price === 0 ? 'Grátis' : `R$ ${service.price.toFixed(2)}`}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className={styles.orderTotal}><strong>Total:</strong> <span className={styles.totalHighlight}>R$ {getTotal().toFixed(2)}</span></p>
              </div>
              
              <div className={styles.ratingSection}>
                {!ratingSubmitted ? (
                  <>
                    <h3 className={styles.ratingTitle}>Avalie nosso atendimento</h3>
                    <div className={styles.starsContainer}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          className={styles.starButton}
                          onClick={() => setRating(star)}
                        >
                          <span className={`${styles.star} ${star <= rating ? styles.starSelected : styles.starUnselected}`}>
                            ★
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    <div className={styles.ratingCommentSection}>
                      <label htmlFor="rating-comment" className={styles.ratingCommentLabel}>
                        Observações (opcional)
                      </label>
                      <textarea
                        id="rating-comment"
                        value={ratingComment}
                        onChange={(e) => setRatingComment(e.target.value)}
                        placeholder="Deixe seu comentário..."
                        className={styles.ratingCommentTextarea}
                        rows={4}
                      />
                    </div>
                    
                    <button 
                      onClick={handleSubmitRating}
                      className={styles.submitRatingButton}
                      disabled={rating === 0}
                    >
                      Enviar Avaliação
                    </button>
                  </>
                ) : (
                  <div className={styles.ratingThanks}>
                    <div className={styles.ratingThanksIcon}>✓</div>
                    <h3 className={styles.ratingThanksTitle}>Obrigado pela avaliação!</h3>
                    <p className={styles.ratingThanksText}>Seu feedback é muito importante para a construção da nossa empresa</p>
                  </div>
                )}
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
              ←
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
                placeholder="Procure na Space Phone"
                value={searchTerm}
                onFocus={() => openVirtualKeyboard('search', searchTerm)}
                readOnly
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

            <div className={styles.actionButtonsContainer}>
              <button className={styles.actionButton} title="Adicionar aos favoritos">
                ❤️
              </button>
              <button className={styles.actionButton} onClick={() => setShowCartModal(true)} title="Ver resumo do atendimento">
                🛒
              </button>
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
                        onClick={() => handleCategoryClick(category.id)}
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
                        {getSelectedServicesDetails().filter(Boolean).map((service, index) => (
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

      {/* Modal do Carrinho - Resumo do Atendimento */}
      {showCartModal && (
        <div className={styles.modalOverlay} onClick={() => setShowCartModal(false)}>
          <div className={styles.cartModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Resumo do Atendimento</h2>
              <button 
                className={styles.closeModal}
                onClick={() => setShowCartModal(false)}
              >
                ✕
              </button>
            </div>
            
            {selectedServices.length === 0 ? (
              <p className={styles.emptyCartModal}>Nenhum serviço selecionado</p>
            ) : (
              <>
                <div className={styles.cartModalItems}>
                  {getSelectedServicesDetails().filter(Boolean).map((service, index) => (
                    <div key={`${service.id}-${index}`} className={styles.cartModalItem}>
                      <span className={styles.cartModalIcon}>{service.icon}</span>
                      <div className={styles.cartModalInfo}>
                        <span className={styles.cartModalName}>{service.name}</span>
                        <span className={styles.cartModalPrice}>
                          {service.price === 0 ? 'Grátis' : `R$ ${service.price.toFixed(2)}`}
                        </span>
                      </div>
                      <button
                        className={styles.removeModalBtn}
                        onClick={() => removeService(index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className={styles.cartModalTotal}>
                  <span>Total:</span>
                  <span className={styles.cartModalTotalValue}>R$ {getTotal().toFixed(2)}</span>
                </div>
                
                <button
                  className={styles.cartModalFinishBtn}
                  onClick={() => {
                    handleFinish()
                    setShowCartModal(false)
                  }}
                  disabled={selectedServices.length === 0}
                >
                  Finalizar Atendimento
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Teclado Virtual */}
      {showVirtualKeyboard && (
        <div className={styles.keyboardOverlay} onClick={closeVirtualKeyboard}>
          <div className={styles.keyboardContainer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.keyboardHeader}>
              <div className={styles.keyboardDisplay}>{keyboardInputValue}</div>
              <button className={styles.keyboardCloseBtn} onClick={closeVirtualKeyboard}>✕</button>
            </div>
            
            <div className={styles.keyboardKeys}>
              <div className={styles.keyboardRow}>
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(key => (
                  <button key={key} className={styles.keyboardKey} onClick={() => handleVirtualKeyPress(key)}>
                    {key}
                  </button>
                ))}
              </div>
              
              <div className={styles.keyboardRow}>
                {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map(key => (
                  <button key={key} className={styles.keyboardKey} onClick={() => handleVirtualKeyPress(key)}>
                    {key}
                  </button>
                ))}
              </div>
              
              <div className={styles.keyboardRow}>
                {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map(key => (
                  <button key={key} className={styles.keyboardKey} onClick={() => handleVirtualKeyPress(key)}>
                    {key}
                  </button>
                ))}
              </div>
              
              <div className={styles.keyboardRow}>
                {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map(key => (
                  <button key={key} className={styles.keyboardKey} onClick={() => handleVirtualKeyPress(key)}>
                    {key}
                  </button>
                ))}
                <button className={styles.keyboardKeyWide} onClick={() => handleVirtualKeyPress('backspace')}>
                  ⌫
                </button>
              </div>
              
              <div className={styles.keyboardRow}>
                <button className={styles.keyboardKeyWide} onClick={() => handleVirtualKeyPress('clear')}>
                  Limpar
                </button>
                <button className={styles.keyboardKeySpace} onClick={() => handleVirtualKeyPress('space')}>
                  Espaço
                </button>
                <button className={styles.keyboardKeyWide} onClick={handleVirtualKeyboardConfirm}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Registro para Convidado */}
      {showGuestRegistrationModal && (
        <div className={styles.modalOverlay} onClick={() => {}}>
          <div className={styles.guestRegistrationModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.guestModalHeader}>
              <h2 className={styles.guestModalTitle}>Complete seu Cadastro</h2>
              <p className={styles.guestModalSubtitle}>Preencha seus dados para finalizar o atendimento</p>
            </div>
            
            <div className={styles.guestModalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nome Completo *</label>
                <input
                  type="text"
                  value={formName}
                  onFocus={() => openVirtualKeyboard('name', formName)}
                  readOnly
                  placeholder="Digite seu nome"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Número de Celular *</label>
                <div className={styles.phoneInputWithKeypad}>
                  <input
                    type="tel"
                    value={formPhone}
                    readOnly
                    placeholder="(00) 00000-0000"
                    className={styles.formInput}
                    onClick={() => setShowNumericKeypad(true)}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>CPF *</label>
                <input
                  type="text"
                  value={formCpf}
                  onFocus={() => openVirtualKeyboard('cpf', formCpf)}
                  readOnly
                  placeholder="000.000.000-00"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Modelo do Aparelho *</label>
                {!formDeviceModel ? (
                  <>
                    <input
                      type="text"
                      value={modelSearchTerm}
                      onFocus={() => openVirtualKeyboard('modelSearch', modelSearchTerm)}
                      readOnly
                      placeholder="Digite para pesquisar o modelo..."
                      className={styles.formInput}
                    />
                    {modelSearchTerm && (
                      <div className={styles.modelDropdown}>
                        {phoneModels
                          .filter(model => 
                            model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                          )
                          .slice(0, 10)
                          .map(model => (
                            <div
                              key={model}
                              className={styles.modelOption}
                              onClick={() => {
                                setFormDeviceModel(model)
                                setModelSearchTerm('')
                              }}
                            >
                              {model}
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.selectedModel}>
                    <span>{formDeviceModel}</span>
                    <button
                      type="button"
                      className={styles.clearModelBtn}
                      onClick={() => setFormDeviceModel('')}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <button
                className={styles.guestModalSubmitBtn}
                onClick={handleGuestRegistrationSubmit}
                disabled={!formName.trim() || !formPhone.trim() || !formCpf.trim() || !formDeviceModel}
              >
                Finalizar Atendimento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Seleção de Modelo para Convidado */}
      {showGuestDeviceModal && (
        <div className={styles.modalOverlay} onClick={() => {}}>
          <div className={styles.guestDeviceModal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.guestModalCloseBtn}
              onClick={() => {
                setShowGuestDeviceModal(false)
                setPendingCategoryId(null)
                setModelSearchTerm('')
              }}
            >
              ✕
            </button>
            <div className={styles.guestModalHeader}>
              <h2 className={styles.guestModalTitle}>Qual o modelo do seu aparelho?</h2>
              <p className={styles.guestModalSubtitle}>Selecione o modelo para ver os serviços disponíveis</p>
            </div>
            
            <div className={styles.guestModalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Modelo do Aparelho *</label>
                {!formDeviceModel ? (
                  <>
                    <input
                      type="text"
                      value={modelSearchTerm}
                      onFocus={() => openVirtualKeyboard('modelSearch', modelSearchTerm)}
                      readOnly
                      placeholder="Digite para pesquisar o modelo..."
                      className={styles.formInput}
                    />
                    {modelSearchTerm && (
                      <div className={styles.modelDropdown}>
                        {phoneModels
                          .filter(model => 
                            model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                          )
                          .slice(0, 10)
                          .map(model => (
                            <div
                              key={model}
                              className={styles.modelOption}
                              onClick={() => {
                                setFormDeviceModel(model)
                                setModelSearchTerm('')
                              }}
                            >
                              {model}
                            </div>
                          ))}
                        {phoneModels.filter(model => 
                          model.toLowerCase().includes(modelSearchTerm.toLowerCase())
                        ).length === 0 && (
                          <div className={styles.modelNoResults}>Nenhum modelo encontrado</div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className={styles.selectedModel}>
                    <span>{formDeviceModel}</span>
                    <button
                      type="button"
                      className={styles.clearModelBtn}
                      onClick={() => setFormDeviceModel('')}
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <button
                className={styles.guestModalSubmitBtn}
                onClick={handleGuestDeviceSelect}
                disabled={!formDeviceModel}
              >
                Confirmar Modelo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}