// UI-specific types

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface LoadingState {
  isLoading: boolean
  error?: string | null
}

export interface PaginationProps {
  page: number
  limit: number
  total: number
  onPageChange: (page: number) => void
}

export interface SortConfig {
  key: string
  direction: 'asc' | 'desc'
}

export interface FilterState {
  [key: string]: string | string[] | number | boolean | undefined
}

export interface TableColumn<T> {
  key: keyof T
  label: string
  sortable?: boolean
  render?: (value: T[keyof T], item: T) => React.ReactNode
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}