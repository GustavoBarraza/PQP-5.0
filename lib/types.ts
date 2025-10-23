import type React from "react"
export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user" | "viewer"
  plan: "free" | "essential" | "advanced" | "enterprise"
  organizationId: string
}

export interface Organization {
  id: string
  name: string
  sector: string
  employees: string
  objective: string
}

export interface Module {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  locked: boolean
  route: string
  requiredPlan: "free" | "essential" | "advanced" | "enterprise"
}

export interface ChecklistItem {
  id: string
  label: string
  completed: boolean
}

export interface MetricData {
  title: string
  value: string
  change?: {
    value: string
    trend: "up" | "down" | "neutral"
  }
  icon?: React.ReactNode
}

export interface AlertPreferences {
  emailAlerts: boolean
  pushAlerts: boolean
  weeklyReport: boolean
  frequency: "realtime" | "daily" | "weekly" | "monthly"
}
