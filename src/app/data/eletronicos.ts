export interface Product {
  id: string
  name: string
  price: number
  category: string
  subcategory: string
  icon?: string
}

export interface Subcategory {
  id: string
  name: string
  icon: string
}

export interface CategoryData {
  id: string
  name: string
  icon: string
  subcategories: Subcategory[]
}

export const eletronicosCategorias: CategoryData = {
  id: 'eletronicos',
  name: 'Eletrônicos',
  icon: '⚡',
  subcategories: [
    { id: 'fones', name: 'Fones', icon: '🎧' },
    { id: 'carregadores', name: 'Carregadores', icon: '🔌' },
    { id: 'cabos', name: 'Cabos', icon: '🔗' },
    { id: 'perifericos', name: 'Periféricos', icon: '⌨️' },
    { id: 'audio', name: 'Áudio', icon: '🔊' },
    { id: 'adaptadores', name: 'Adaptadores', icon: '🔄' },
    { id: 'armazenamento', name: 'Armazenamento & Conectividade', icon: '💾' },
    { id: 'suportes', name: 'Suportes Veiculares', icon: '🚗' },
    { id: 'outros', name: 'Outros Acessórios', icon: '📱' }
  ]
}

export const eletronicosProducts: Product[] = [
  // CARREGADORES
  { id: 'car-001', name: 'Carregador por Indução (Wireless)', price: 89.90, category: 'eletronicos', subcategory: 'carregadores', icon: '⚡' },
  { id: 'car-002', name: 'Carregador para Notebook', price: 129.90, category: 'eletronicos', subcategory: 'carregadores', icon: '💻' },
  { id: 'car-003', name: 'Carregador Automotivo 12V', price: 49.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🚗' },
  
  // Carregadores Veiculares
  { id: 'car-004', name: 'Carregador Veicular – PADRÃO', price: 39.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🚙' },
  { id: 'car-005', name: 'Carregador Veicular – TURBO', price: 59.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🚙' },
  { id: 'car-006', name: 'Carregador Veicular – PREMIUM', price: 79.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🚙' },
  
  // Carregadores USB → Micro-USB
  { id: 'car-007', name: 'Carregador USB → Micro-USB – PADRÃO', price: 29.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  { id: 'car-008', name: 'Carregador USB → Micro-USB – TURBO', price: 49.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  
  // Carregadores USB → USB-C
  { id: 'car-009', name: 'Carregador USB → USB-C – PADRÃO', price: 34.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  { id: 'car-010', name: 'Carregador USB → USB-C – TURBO', price: 54.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  
  // Carregadores USB → Lightning
  { id: 'car-011', name: 'Carregador USB → Lightning – PADRÃO', price: 39.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  { id: 'car-012', name: 'Carregador USB → Lightning – TURBO', price: 59.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  
  // Carregadores USB-C → Lightning
  { id: 'car-013', name: 'Carregador USB-C → Lightning – PADRÃO', price: 44.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  { id: 'car-014', name: 'Carregador USB-C → Lightning – TURBO', price: 64.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  
  // Carregadores USB-C → USB-C
  { id: 'car-015', name: 'Carregador USB-C → USB-C – PADRÃO', price: 39.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  { id: 'car-016', name: 'Carregador USB-C → USB-C – TURBO', price: 59.90, category: 'eletronicos', subcategory: 'carregadores', icon: '🔌' },
  
  // ÁUDIO - Caixas de Som
  { id: 'aud-001', name: 'Caixa de Som Portátil – Pequena', price: 79.90, category: 'eletronicos', subcategory: 'audio', icon: '🔊' },
  { id: 'aud-002', name: 'Caixa de Som Portátil – Média', price: 129.90, category: 'eletronicos', subcategory: 'audio', icon: '🔊' },
  { id: 'aud-003', name: 'Caixa de Som Portátil – Grande', price: 189.90, category: 'eletronicos', subcategory: 'audio', icon: '🔊' },
  
  // ÁUDIO - Fones com Fio P2
  { id: 'aud-004', name: 'Fone de Ouvido P2 com Silicone', price: 24.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-005', name: 'Fone de Ouvido P2 sem Silicone', price: 19.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  
  // ÁUDIO - Fones com Fio USB-C
  { id: 'aud-006', name: 'Fone de Ouvido USB-C com Silicone', price: 34.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-007', name: 'Fone de Ouvido USB-C sem Silicone', price: 29.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  
  // ÁUDIO - Fones com Fio Lightning
  { id: 'aud-008', name: 'Fone de Ouvido Lightning com Silicone', price: 44.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-009', name: 'Fone de Ouvido Lightning sem Silicone', price: 39.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-010', name: 'Fone de Ouvido Lightning – PREMIUM', price: 89.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  
  // ÁUDIO - Headsets
  { id: 'aud-011', name: 'Headset com Fio – PADRÃO', price: 49.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-012', name: 'Headset com Fio – PREMIUM', price: 89.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  
  // ÁUDIO - Fones Bluetooth PADRÃO
  { id: 'aud-013', name: 'Fone Bluetooth com Silicone – PADRÃO', price: 79.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-014', name: 'Fone Bluetooth sem Silicone – PADRÃO', price: 69.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-015', name: 'Fone Bluetooth Esportivo com Silicone – PADRÃO', price: 89.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  
  // ÁUDIO - Fones Bluetooth TURBO
  { id: 'aud-016', name: 'Fone Bluetooth com Silicone – TURBO', price: 129.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-017', name: 'Fone Bluetooth sem Silicone – TURBO', price: 119.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-018', name: 'Fone Bluetooth Esportivo com Silicone – TURBO', price: 139.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  
  // ÁUDIO - Fones Bluetooth PREMIUM
  { id: 'aud-019', name: 'Fone Bluetooth com Silicone – PREMIUM', price: 189.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-020', name: 'Fone Bluetooth sem Silicone – PREMIUM', price: 179.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  { id: 'aud-021', name: 'Fone Bluetooth Esportivo Intra-auricular – PREMIUM', price: 199.90, category: 'eletronicos', subcategory: 'audio', icon: '🎧' },
  
  // PERIFÉRICOS - Teclados
  { id: 'per-001', name: 'Teclado Gamer com Fio', price: 149.90, category: 'eletronicos', subcategory: 'perifericos', icon: '⌨️' },
  { id: 'per-002', name: 'Teclado com Fio', price: 79.90, category: 'eletronicos', subcategory: 'perifericos', icon: '⌨️' },
  { id: 'per-003', name: 'Teclado sem Fio (Wireless)', price: 129.90, category: 'eletronicos', subcategory: 'perifericos', icon: '⌨️' },
  
  // PERIFÉRICOS - Mouses
  { id: 'per-004', name: 'Mouse Gamer', price: 89.90, category: 'eletronicos', subcategory: 'perifericos', icon: '🖱️' },
  { id: 'per-005', name: 'Mouse com Fio', price: 39.90, category: 'eletronicos', subcategory: 'perifericos', icon: '🖱️' },
  { id: 'per-006', name: 'Mouse sem Fio (Wireless)', price: 69.90, category: 'eletronicos', subcategory: 'perifericos', icon: '🖱️' },
  
  // PERIFÉRICOS - Controles
  { id: 'per-007', name: 'Controle Sem Fio DualShock 4 (PS4)', price: 299.90, category: 'eletronicos', subcategory: 'perifericos', icon: '🎮' },
  
  // CABOS - Padrão
  { id: 'cab-001', name: 'Cabo HDMI', price: 29.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-002', name: 'Cabo USB-C → USB-A', price: 24.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-003', name: 'Cabo USB-A → USB-C', price: 24.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-004', name: 'Cabo USB-A → Lightning', price: 29.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-005', name: 'Cabo USB-A → Micro-USB', price: 19.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-006', name: 'Cabo USB-C → Lightning', price: 39.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-007', name: 'Cabo USB-C → USB-C', price: 29.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // CABOS - Micro-USB
  { id: 'cab-008', name: 'Cabo Micro-USB – PADRÃO', price: 19.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-009', name: 'Cabo Micro-USB – TURBO', price: 34.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-010', name: 'Cabo Micro-USB – PREMIUM', price: 49.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // CABOS - USB-C
  { id: 'cab-011', name: 'Cabo USB-C – PADRÃO', price: 24.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-012', name: 'Cabo USB-C – TURBO', price: 39.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-013', name: 'Cabo USB-C – PREMIUM', price: 59.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // CABOS - Lightning
  { id: 'cab-014', name: 'Cabo Lightning – PADRÃO', price: 29.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-015', name: 'Cabo Lightning – TURBO', price: 49.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-016', name: 'Cabo Lightning – PREMIUM', price: 69.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // CABOS - USB-C → Lightning
  { id: 'cab-017', name: 'Cabo USB-C → Lightning – PADRÃO', price: 39.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-018', name: 'Cabo USB-C → Lightning – TURBO', price: 59.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // CABOS - USB-C → USB-C
  { id: 'cab-019', name: 'Cabo USB-C → USB-C – PADRÃO', price: 29.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-020', name: 'Cabo USB-C → USB-C – TURBO', price: 49.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // CABOS - Longos 2m
  { id: 'cab-021', name: 'Cabo 2m USB-C → USB-A', price: 39.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-022', name: 'Cabo 2m USB-A → USB-C', price: 39.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-023', name: 'Cabo 2m USB-A → Lightning', price: 44.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-024', name: 'Cabo 2m USB-A → Micro-USB', price: 34.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // CABOS - Longos 3m
  { id: 'cab-025', name: 'Cabo 3m USB-A → USB-C', price: 49.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-026', name: 'Cabo 3m USB-A → Lightning', price: 54.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  { id: 'cab-027', name: 'Cabo 3m USB-A → Micro-USB', price: 44.90, category: 'eletronicos', subcategory: 'cabos', icon: '🔗' },
  
  // ARMAZENAMENTO & CONECTIVIDADE - Pendrives
  { id: 'arm-001', name: 'Pendrive USB 16GB', price: 29.90, category: 'eletronicos', subcategory: 'armazenamento', icon: '💾' },
  { id: 'arm-002', name: 'Pendrive USB 32GB', price: 49.90, category: 'eletronicos', subcategory: 'armazenamento', icon: '💾' },
  { id: 'arm-003', name: 'Pendrive USB 64GB', price: 79.90, category: 'eletronicos', subcategory: 'armazenamento', icon: '💾' },
  
  // ARMAZENAMENTO & CONECTIVIDADE - Outros
  { id: 'arm-004', name: 'Adaptador USB Wireless (Wi-Fi)', price: 39.90, category: 'eletronicos', subcategory: 'armazenamento', icon: '📡' },
  { id: 'arm-005', name: 'Hub USB', price: 49.90, category: 'eletronicos', subcategory: 'armazenamento', icon: '🔌' },
  
  // ADAPTADORES
  { id: 'ada-001', name: 'Adaptador P2 → USB-C', price: 24.90, category: 'eletronicos', subcategory: 'adaptadores', icon: '🔄' },
  { id: 'ada-002', name: 'Adaptador P2 → Lightning', price: 29.90, category: 'eletronicos', subcategory: 'adaptadores', icon: '🔄' },
  { id: 'ada-003', name: 'Adaptador de Tomada Internacional', price: 34.90, category: 'eletronicos', subcategory: 'adaptadores', icon: '🔌' },
  
  // SUPORTES VEICULARES
  { id: 'sup-001', name: 'Suporte Veicular Magnético', price: 49.90, category: 'eletronicos', subcategory: 'suportes', icon: '🧲' },
  { id: 'sup-002', name: 'Suporte Veicular com Ventosa', price: 39.90, category: 'eletronicos', subcategory: 'suportes', icon: '🚗' },
  { id: 'sup-003', name: 'Suporte para Moto', price: 59.90, category: 'eletronicos', subcategory: 'suportes', icon: '🏍️' },
  
  // OUTROS ACESSÓRIOS
  { id: 'out-001', name: 'AirTag Localizador', price: 249.90, category: 'eletronicos', subcategory: 'outros', icon: '📍' },
  { id: 'out-002', name: 'Bastão de Selfie', price: 49.90, category: 'eletronicos', subcategory: 'outros', icon: '🤳' },
  { id: 'out-003', name: 'Máquina Dragão (Vape)', price: 129.90, category: 'eletronicos', subcategory: 'outros', icon: '💨' },
  { id: 'out-004', name: 'Lanterna LED', price: 39.90, category: 'eletronicos', subcategory: 'outros', icon: '🔦' },
  { id: 'out-005', name: 'Capa de Chuva', price: 19.90, category: 'eletronicos', subcategory: 'outros', icon: '☔' },
]
