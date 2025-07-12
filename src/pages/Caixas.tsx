
import React, { useState } from 'react';
import { Search, Plus, Archive, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const caixas = [
  {
    id: 1,
    codigo: 'CX-001',
    titulo: 'Contratos 2024',
    descricao: 'Contratos de prestação de serviços do ano 2024',
    localizacao: 'Estante A - Prateleira 3',
    documentos: 15,
    capacidade: 20,
    dataCreated: '2024-01-01',
    responsavel: 'Maria Santos',
    status: 'Ativa',
  },
  {
    id: 2,
    codigo: 'CX-002',
    titulo: 'Relatórios Financeiros Q4',
    descricao: 'Relatórios financeiros do quarto trimestre',
    localizacao: 'Estante B - Prateleira 1',
    documentos: 8,
    capacidade: 15,
    dataCreated: '2024-01-05',
    responsavel: 'João Silva',
    status: 'Ativa',
  },
  {
    id: 3,
    codigo: 'CX-003',
    titulo: 'Manuais e Procedimentos',
    descricao: 'Documentação técnica e manuais operacionais',
    localizacao: 'Estante A - Prateleira 1',
    documentos: 12,
    capacidade: 25,
    dataCreated: '2024-01-08',
    responsavel: 'Ana Costa',
    status: 'Ativa',
  },
  {
    id: 4,
    codigo: 'CX-004',
    titulo: 'Arquivos Históricos',
    descricao: 'Documentos históricos da empresa',
    localizacao: 'Estante C - Prateleira 2',
    documentos: 30,
    capacidade: 30,
    dataCreated: '2023-12-15',
    responsavel: 'Carlos Lima',
    status: 'Cheia',
  },
  {
    id: 5,
    codigo: 'CX-005',
    titulo: 'Documentos RH',
    descricao: 'Documentos do departamento de recursos humanos',
    localizacao: 'Estante D - Prateleira 1',
    documentos: 0,
    capacidade: 20,
    dataCreated: '2024-01-12',
    responsavel: 'Pedro Oliveira',
    status: 'Vazia',
  },
];

const statusOptions = ['Todos', 'Ativa', 'Cheia', 'Vazia', 'Arquivada'];
const responsavelOptions = ['Todos', 'Maria Santos', 'João Silva', 'Ana Costa', 'Carlos Lima', 'Pedro Oliveira'];

export function Caixas() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedResponsavel, setSelectedResponsavel] = useState('Todos');

  const filteredCaixas = caixas.filter(caixa => {
    const matchesSearch = caixa.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caixa.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caixa.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'Todos' || caixa.status === selectedStatus;
    const matchesResponsavel = selectedResponsavel === 'Todos' || caixa.responsavel === selectedResponsavel;
    
    return matchesSearch && matchesStatus && matchesResponsavel;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Ativa':
        return <Badge variant="default" className="bg-green-100 text-green-800">Ativa</Badge>;
      case 'Cheia':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Cheia</Badge>;
      case 'Vazia':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Vazia</Badge>;
      case 'Arquivada':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800">Arquivada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getOccupancyPercentage = (documentos: number, capacidade: number) => {
    return (documentos / capacidade) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Caixas de Arquivo</h1>
          <p className="text-gray-600">Organize e gerencie suas caixas de documentos</p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Nova Caixa
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar caixas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status da caixa" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedResponsavel} onValueChange={setSelectedResponsavel}>
              <SelectTrigger>
                <SelectValue placeholder="Responsável" />
              </SelectTrigger>
              <SelectContent>
                {responsavelOptions.map(responsavel => (
                  <SelectItem key={responsavel} value={responsavel}>{responsavel}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Caixas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCaixas.map((caixa) => (
          <Card key={caixa.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{caixa.codigo}</CardTitle>
                  <CardDescription className="font-medium text-gray-900">
                    {caixa.titulo}
                  </CardDescription>
                </div>
                {getStatusBadge(caixa.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{caixa.descricao}</p>
              
              {/* Ocupação */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ocupação</span>
                  <span>{caixa.documentos}/{caixa.capacidade} documentos</span>
                </div>
                <Progress 
                  value={getOccupancyPercentage(caixa.documentos, caixa.capacidade)} 
                  className="h-2"
                />
              </div>

              {/* Informações */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{caixa.localizacao}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{caixa.responsavel}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>Criada em {new Date(caixa.dataCreated).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Archive className="h-4 w-4 mr-2" />
                  Ver Documentos
                </Button>
                <Button variant="ghost" size="sm">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{caixas.length}</div>
              <div className="text-sm text-gray-600">Total de Caixas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {caixas.filter(c => c.status === 'Ativa').length}
              </div>
              <div className="text-sm text-gray-600">Caixas Ativas</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {caixas.filter(c => c.status === 'Cheia').length}
              </div>
              <div className="text-sm text-gray-600">Caixas Cheias</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {caixas.reduce((acc, caixa) => acc + caixa.documentos, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Documentos</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
