# SpacePhones - Sistema de Totem de Atendimento

Sistema completo de totem para assistência técnica de celulares com dashboard administrativo.

## 🚀 Funcionalidades

### Totem de Atendimento (/)
- Cadastro de cliente (nome, telefone, modelo do aparelho)
- Seleção de serviços com busca
- Cálculo automático de valores
- Campo de notas adicionais
- Geração de ID único para cada atendimento

### Dashboard Administrativo (/admin)
- Visualização de todos os pedidos em tempo real
- Filtros: Todos, Pendentes, Concluídos
- Busca por nome, telefone ou ID
- Estatísticas: Total de pedidos, pendentes, concluídos, receita total
- Marcar pedidos como concluídos
- Excluir pedidos
- Tabela completa com:
  - ID do atendimento
  - Data e hora
  - Dados do cliente
  - Modelo do aparelho
  - Serviços selecionados
  - Notas adicionais
  - Valor total
  - Status (Pendente/Concluído)

## 🎨 Design

Interface baseada no tema SPACEPHONES com cores verde/neon e estilo futurista espacial.

## 🔧 Como usar

1. **Iniciar o servidor:**
   ```bash
   npm run dev
   ```

2. **Acessar o totem:**
   - Abra http://localhost:3000
   - Clique no ícone ⚙️ no canto superior direito para acessar o dashboard admin

3. **Acessar diretamente o dashboard:**
   - http://localhost:3000/admin

## 💾 Armazenamento

Os dados são salvos no **localStorage** do navegador com a chave `spacephone_orders`.

## 📊 Estrutura de Dados

Cada pedido salvo contém:
```typescript
{
  id: string              // ID único do cliente (CLT-timestamp)
  customerName: string    // Nome do cliente
  customerPhone: string   // Telefone
  deviceModel: string     // Modelo do aparelho
  services: Array         // Serviços selecionados com preços
  totalValue: number      // Valor total
  additionalNotes: string // Notas do cliente
  createdAt: string       // Data/hora ISO
  status: 'pending' | 'completed'
}
```

## 🔐 Acesso ao Dashboard

O link para o dashboard está discretamente posicionado no header como um ícone de engrenagem ⚙️ no canto superior direito.
