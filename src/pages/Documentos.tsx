
import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const documentos = [
  {
    id: 1,
    titulo: 'Contrato de Prestação de Serviços ABC',
    tipo: 'Contrato',
    dataArquivamento: '2024-01-15',
    caixa: 'CX-001',
    status: 'Arquivado',
    tamanho: '2.4 MB',
    usuario: 'Maria Santos',
  },
  {
    id: 2,
    titulo: 'Relatório Financeiro Q4 2023',
    tipo: 'Relatório',
    dataArquivamento: '2024-01-12',
    caixa: 'CX-002',
    status: 'Arquivado',
    tamanho: '1.8 MB',
    usuario: 'João Silva',
  },
  {
    id: 3,
    titulo: 'Ata de Reunião - Janeiro 2024',
    tipo: 'Ata',
    dataArquivamento: '2024-01-10',
    caixa: 'CX-001',
    status: 'Pendente',
    tamanho: '856 KB',
    usuario: 'Ana Costa',
  },
  {
    id: 4,
    titulo: 'Manual de Procedimentos v2.0',
    tipo: 'Manual',
    dataArquivamento: '2024-01-08',
    caixa: 'CX-003',
    status: 'Arquivado',
    tamanho: '4.2 MB',
    usuario: 'Carlos Lima',
  },
];

const tiposDocumento = ['Todos', 'Contrato', 'Relatório', 'Ata', 'Manual', 'Certificado'];
const statusOptions = ['Todos', 'Arquivado', 'Pendente', 'Em Revisão'];

export function Documentos() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');

  const filteredDocuments = documentos.filter(doc => {
    const matchesSearch = doc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.caixa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'Todos' || doc.tipo === selectedType;
    const matchesStatus = selectedStatus === 'Todos' || doc.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Arquivado':
        return <Badge variant="default" className="bg-green-100 text-green-800">Arquivado</Badge>;
      case 'Pendente':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pendente</Badge>;
      case 'Em Revisão':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Em Revisão</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documentos</h1>
          <p className="text-gray-600">Gerencie todos os documentos arquivados</p>
        </div>
        <Button className="sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Novo Documento
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros de Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar documentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Tipo de documento" />
              </SelectTrigger>
              <SelectContent>
                {tiposDocumento.map(tipo => (
                  <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtros Avançados
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Lista de Documentos</CardTitle>
            <div className="text-sm text-gray-600">
              {filteredDocuments.length} documento(s) encontrado(s)
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Data Arquivamento</TableHead>
                  <TableHead>Caixa</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((documento) => (
                  <TableRow key={documento.id}>
                    <TableCell>
                      <div className="font-medium">{documento.titulo}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{documento.tipo}</Badge>
                    </TableCell>
                    <TableCell>{new Date(documento.dataArquivamento).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{documento.caixa}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(documento.status)}</TableCell>
                    <TableCell>{documento.tamanho}</TableCell>
                    <TableCell>{documento.usuario}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <div className="h-4 w-4">⋮</div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
