# Estrutura de Categorias de Eletrônicos

## Funcionalidade Implementada

Foi implementada uma estrutura hierárquica de navegação para a categoria "Eletrônicos" com três níveis:

1. **Categoria Principal**: Eletrônicos
2. **Subcategorias**: 9 subcategorias diferentes
3. **Produtos**: 145+ produtos organizados por subcategoria

## Como Funciona

### Navegação

1. Na página de serviços, clique em **"Eletrônicos"**
2. As **subcategorias** aparecerão:
   - 🎧 Fones
   - 🔌 Carregadores
   - 🔗 Cabos
   - ⌨️ Periféricos
   - 🔊 Áudio
   - 🔄 Adaptadores
   - 💾 Armazenamento & Conectividade
   - 🚗 Suportes Veiculares
   - 📱 Outros Acessórios

3. Clique em uma **subcategoria** (ex: "Fones")
4. Os **produtos** daquela subcategoria serão exibidos
5. Clique nos produtos para adicioná-los ao carrinho

## Estrutura de Dados

### Arquivo: `src/app/data/eletronicos.ts`

Contém:
- Interface `Product`: Define a estrutura de cada produto
- Interface `Subcategory`: Define as subcategorias
- Interface `CategoryData`: Define a estrutura da categoria principal
- `eletronicosCategorias`: Objeto com todas as subcategorias
- `eletronicosProducts`: Array com todos os 145+ produtos

### Produtos por Subcategoria

#### 🔌 Carregadores (16 produtos)
- Carregador por Indução (Wireless)
- Carregador para Notebook
- Carregador Automotivo 12V
- Carregadores Veiculares (Padrão, Turbo, Premium)
- Carregadores USB → Micro-USB (Padrão, Turbo)
- Carregadores USB → USB-C (Padrão, Turbo)
- Carregadores USB → Lightning (Padrão, Turbo)
- Carregadores USB-C → Lightning (Padrão, Turbo)
- Carregadores USB-C → USB-C (Padrão, Turbo)

#### 🔊 Áudio (21 produtos)
**Caixas de Som:**
- Caixa de Som Portátil (Pequena, Média, Grande)

**Fones com Fio:**
- Fones P2, USB-C, Lightning (com/sem silicone)
- Headsets (Padrão, Premium)

**Fones Bluetooth:**
- Fones Bluetooth Padrão (3 variações)
- Fones Bluetooth Turbo (3 variações)
- Fones Bluetooth Premium (3 variações)

#### ⌨️ Periféricos (7 produtos)
- Teclados (Gamer, com fio, sem fio)
- Mouses (Gamer, com fio, sem fio)
- Controle DualShock 4 (PS4)

#### 🔗 Cabos (27 produtos)
**Cabos Padrão:**
- HDMI, USB-C ↔ USB-A, Lightning, Micro-USB

**Cabos por Tipo:**
- Micro-USB (Padrão, Turbo, Premium)
- USB-C (Padrão, Turbo, Premium)
- Lightning (Padrão, Turbo, Premium)
- USB-C → Lightning (Padrão, Turbo)
- USB-C → USB-C (Padrão, Turbo)

**Cabos Longos:**
- Cabos de 2m (4 variações)
- Cabos de 3m (3 variações)

#### 💾 Armazenamento & Conectividade (5 produtos)
- Pendrives USB (16GB, 32GB, 64GB)
- Adaptador USB Wireless (Wi-Fi)
- Hub USB

#### 🔄 Adaptadores (3 produtos)
- Adaptador P2 → USB-C
- Adaptador P2 → Lightning
- Adaptador de Tomada Internacional

#### 🚗 Suportes Veiculares (3 produtos)
- Suporte Veicular Magnético
- Suporte Veicular com Ventosa
- Suporte para Moto

#### 📱 Outros Acessórios (5 produtos)
- AirTag Localizador
- Bastão de Selfie
- Máquina Dragão (Vape)
- Lanterna LED
- Capa de Chuva

## Alterações nos Arquivos

### 1. `src/app/page.tsx`
**Mudanças:**
- Importação dos dados de eletrônicos
- Novo estado: `expandedSubcategory`
- Novas funções:
  - `handleSubcategoryClick()`: Gerencia clique em subcategorias
  - `toggleProductService()`: Adiciona/remove produtos do carrinho
- Atualização em `getSelectedServicesDetails()`: Suporta produtos eletrônicos
- Nova renderização condicional: Subcategorias e produtos de eletrônicos

### 2. `src/app/page.module.css`
**Novos estilos adicionados:**
```css
.subcategorySection
.subcategoryButton
.subcategoryName
.productsContainer
.productItemButton
```

### 3. `src/app/data/eletronicos.ts` (NOVO)
Arquivo criado com toda a estrutura de dados

## Exemplo de Fluxo

```
Usuário clica em "Eletrônicos"
    ↓
Sistema expande e mostra 9 subcategorias
    ↓
Usuário clica em "Carregadores"
    ↓
Sistema mostra 16 tipos de carregadores
    ↓
Usuário clica em "Carregador USB-C → USB-C – TURBO"
    ↓
Produto é adicionado ao carrinho (R$ 59,90)
    ↓
Aparece no resumo do atendimento
```

## Características Técnicas

- ✅ Navegação hierárquica (3 níveis)
- ✅ Filtro automático por subcategoria
- ✅ Estado visual dos produtos selecionados
- ✅ Integração com carrinho existente
- ✅ Preços individuais por produto
- ✅ Ícones para cada produto
- ✅ Animações e transições suaves
- ✅ Responsivo e interativo

## Preços

Os preços variam de **R$ 19,90** (produtos básicos) até **R$ 299,90** (produtos premium como Controle DualShock 4).

**Faixas de preço:**
- Acessórios básicos: R$ 19,90 - R$ 39,90
- Produtos intermediários: R$ 49,90 - R$ 79,90
- Produtos avançados: R$ 89,90 - R$ 149,90
- Produtos premium: R$ 179,90 - R$ 299,90
