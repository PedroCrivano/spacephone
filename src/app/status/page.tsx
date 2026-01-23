'use client'

import { useState, useEffect } from 'react'
import styles from './admin.module.css'
import Link from 'next/link'

interface ServiceOrder {
  id: string
  customerName: string
  customerPhone: string
  deviceModel: string
  services: Array<{
    name: string
    price: number
  }>
  totalValue: number
  additionalNotes: string
  createdAt: string
  status: 'pending' | 'completed'
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    try {
      const storedOrders = localStorage.getItem('spacephone_orders')
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders))
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error)
    }
  }

  const toggleOrderStatus = (orderId: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId 
        ? { ...order, status: order.status === 'pending' ? 'completed' : 'pending' as 'pending' | 'completed' }
        : order
    )
    setOrders(updatedOrders)
    localStorage.setItem('spacephone_orders', JSON.stringify(updatedOrders))
  }

  const deleteOrder = (orderId: string) => {
    if (confirm('Tem certeza que deseja excluir este pedido?')) {
      const updatedOrders = orders.filter(order => order.id !== orderId)
      setOrders(updatedOrders)
      localStorage.setItem('spacephone_orders', JSON.stringify(updatedOrders))
    }
  }

  const getFilteredOrders = () => {
    let filtered = orders

    if (filter !== 'all') {
      filtered = filtered.filter(order => order.status === filter)
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerPhone.includes(searchTerm) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTotalRevenue = () => {
    return orders.reduce((sum, order) => sum + order.totalValue, 0)
  }

  const getPendingCount = () => {
    return orders.filter(order => order.status === 'pending').length
  }

  const getCompletedCount = () => {
    return orders.filter(order => order.status === 'completed').length
  }

  const filteredOrders = getFilteredOrders()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.logo}>
            <h1>SPACE PHONE</h1>
          </div>
          <Link href="/" className={styles.backLink}>
            ← Voltar ao Totem
          </Link>
        </div>
        <h2 className={styles.subtitle}>Dashboard Administrativo</h2>
      </header>

      <main className={styles.main}>
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>📊</div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Total de Pedidos</span>
              <span className={styles.statValue}>{orders.length}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>⏳</div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Pendentes</span>
              <span className={styles.statValue}>{getPendingCount()}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>✅</div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Concluídos</span>
              <span className={styles.statValue}>{getCompletedCount()}</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Receita Total</span>
              <span className={styles.statValue}>R$ {getTotalRevenue().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="🔍 Buscar por nome, telefone ou ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filterButtons}>
            <button
              className={`${styles.filterBtn} ${filter === 'all' ? styles.active : ''}`}
              onClick={() => setFilter('all')}
            >
              Todos
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pendentes
            </button>
            <button
              className={`${styles.filterBtn} ${filter === 'completed' ? styles.active : ''}`}
              onClick={() => setFilter('completed')}
            >
              Concluídos
            </button>
          </div>
        </div>

        <div className={styles.tableContainer}>
          {filteredOrders.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Nenhum pedido encontrado</p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data/Hora</th>
                  <th>Cliente</th>
                  <th>Telefone</th>
                  <th>Aparelho</th>
                  <th>Serviços</th>
                  <th>Notas</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id} className={order.status === 'completed' ? styles.completedRow : ''}>
                    <td className={styles.idCell}>{order.id}</td>
                    <td className={styles.dateCell}>{formatDate(order.createdAt)}</td>
                    <td className={styles.nameCell}>{order.customerName}</td>
                    <td>{order.customerPhone}</td>
                    <td>{order.deviceModel}</td>
                    <td className={styles.servicesCell}>
                      <ul>
                        {order.services.map((service, idx) => (
                          <li key={idx}>
                            {service.name} - R$ {service.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className={styles.notesCell}>
                      {order.additionalNotes || '-'}
                    </td>
                    <td className={styles.valueCell}>
                      R$ {order.totalValue.toFixed(2)}
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status]}`}>
                        {order.status === 'pending' ? 'Pendente' : 'Concluído'}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => toggleOrderStatus(order.id)}
                        className={styles.toggleBtn}
                        title={order.status === 'pending' ? 'Marcar como concluído' : 'Marcar como pendente'}
                      >
                        {order.status === 'pending' ? '✓' : '↺'}
                      </button>
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className={styles.deleteBtn}
                        title="Excluir pedido"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
