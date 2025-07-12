
import React from 'react';
import { FileText, Archive, Users, TrendingUp, Calendar, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const statsCards = [
  {
    title: 'Total de Documentos',
    value: '1,247',
    change: '+12%',
    changeType: 'positive' as const,
    icon: FileText,
  },
  {
    title: 'Caixas Arquivadas',
    value: '89',
    change: '+3%',
    changeType: 'positive' as const,
    icon: Archive,
  },
  {
    title: 'Usuários Ativos',
    value: '23',
    change: '+2',
    changeType: 'positive' as const,
    icon: Users,
  },
  {
    title: 'Consultas Hoje',
    value: '156',
    change: '+24%',
    changeType: 'positive' as const,
    icon: TrendingUp,
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'document',
    title: 'Contrato ABC-2024 foi arquivado',
    user: 'Maria Santos',
    time: '2 horas atrás',
    status: 'completed',
  },
  {
    id: 2,
    type: 'box',
    title: 'Caixa CX-001 foi criada',
    user: 'João Silva',
    time: '4 horas atrás',
    status: 'completed',
  },
  {
    id: 3,
    type: 'search',
    title: 'Consulta de documento realizada',
    user: 'Ana Costa',
    time: '6 horas atrás',
    status: 'info',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do sistema de arquivo morto</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change} vs mês anterior
                  </p>
                </div>
                <div className="bg-blue-50 p-3 rounded-full">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Storage Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Uso de Armazenamento</CardTitle>
            <CardDescription>
              Espaço utilizado para documentos arquivados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Documentos Digitais</span>
                <span>2.4 GB de 10 GB</span>
              </div>
              <Progress value={24} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Índices e Metadados</span>
                <span>450 MB de 2 GB</span>
              </div>
              <Progress value={22} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Backups</span>
                <span>1.8 GB de 5 GB</span>
              </div>
              <Progress value={36} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>
              Últimas ações realizadas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    {activity.type === 'document' && <FileText className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'box' && <Archive className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'search' && <AlertCircle className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500">por {activity.user}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                  <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                    {activity.status === 'completed' ? 'Concluído' : 'Info'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse rapidamente as principais funcionalidades
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <FileText className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Novo Documento</h3>
              <p className="text-sm text-gray-600">Arquivar novo documento</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Archive className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Nova Caixa</h3>
              <p className="text-sm text-gray-600">Criar nova caixa de arquivo</p>
            </button>
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Calendar className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="font-medium">Relatórios</h3>
              <p className="text-sm text-gray-600">Gerar relatórios mensais</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
