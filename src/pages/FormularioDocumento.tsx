
import React, { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const tiposDocumento = [
  'Contrato',
  'Relatório',
  'Ata',
  'Manual',
  'Certificado',
  'Ofício',
  'Memorando',
  'Outro',
];

const caixasDisponiveis = [
  { codigo: 'CX-001', titulo: 'Contratos 2024', disponivel: 5 },
  { codigo: 'CX-002', titulo: 'Relatórios Financeiros Q4', disponivel: 7 },
  { codigo: 'CX-003', titulo: 'Manuais e Procedimentos', disponível: 13 },
  { codigo: 'CX-005', titulo: 'Documentos RH', disponivel: 20 },
];

export function FormularioDocumento() {
  const [formData, setFormData] = useState({
    titulo: '',
    tipo: '',
    descricao: '',
    caixa: '',
    palavrasChave: '',
    observacoes: '',
  });
  
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setArquivos(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setArquivos(prev => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', { ...formData, tags, arquivos });
    // Aqui você enviaria os dados para a API
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novo Documento</h1>
          <p className="text-gray-600">Cadastre um novo documento no arquivo morto</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Básicas */}
            <Card>
              <CardHeader>
                <CardTitle>Informações Básicas</CardTitle>
                <CardDescription>
                  Dados principais do documento a ser arquivado
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título do Documento *</Label>
                    <Input
                      id="titulo"
                      placeholder="Ex: Contrato de Prestação de Serviços"
                      value={formData.titulo}
                      onChange={(e) => handleInputChange('titulo', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Documento *</Label>
                    <Select 
                      value={formData.tipo} 
                      onValueChange={(value) => handleInputChange('tipo', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposDocumento.map(tipo => (
                          <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <Textarea
                    id="descricao"
                    placeholder="Descreva brevemente o conteúdo do documento..."
                    value={formData.descricao}
                    onChange={(e) => handleInputChange('descricao', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caixa">Caixa de Destino *</Label>
                  <Select 
                    value={formData.caixa} 
                    onValueChange={(value) => handleInputChange('caixa', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a caixa" />
                    </SelectTrigger>
                    <SelectContent>
                      {caixasDisponiveis.map(caixa => (
                        <SelectItem key={caixa.codigo} value={caixa.codigo}>
                          {caixa.codigo} - {caixa.titulo} ({caixa.disponivel} disponíveis)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Upload de Arquivos */}
            <Card>
              <CardHeader>
                <CardTitle>Upload de Arquivos</CardTitle>
                <CardDescription>
                  Faça upload dos arquivos digitais do documento
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Clique para selecionar arquivos ou arraste e solte aqui
                    </p>
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX, JPG, PNG (máx. 10MB por arquivo)
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>

                {/* Lista de arquivos */}
                {arquivos.length > 0 && (
                  <div className="space-y-2">
                    <Label>Arquivos Selecionados</Label>
                    <div className="space-y-2">
                      {arquivos.map((arquivo, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <div className="text-sm font-medium">{arquivo.name}</div>
                            <div className="text-xs text-gray-500">
                              ({(arquivo.size / 1024 / 1024).toFixed(2)} MB)
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Metadados */}
            <Card>
              <CardHeader>
                <CardTitle>Metadados e Tags</CardTitle>
                <CardDescription>
                  Informações adicionais para facilitar a busca
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newTag">Tags/Palavras-chave</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="newTag"
                      placeholder="Digite uma palavra-chave"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline">
                      Adicionar
                    </Button>
                  </div>
                  
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                          <span>{tag}</span>
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => removeTag(tag)}
                          />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações</Label>
                  <Textarea
                    id="observacoes"
                    placeholder="Observações adicionais sobre o documento..."
                    value={formData.observacoes}
                    onChange={(e) => handleInputChange('observacoes', e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Resumo */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm">
                  <div className="font-medium text-gray-700">Título:</div>
                  <div className="text-gray-600">{formData.titulo || 'Não informado'}</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium text-gray-700">Tipo:</div>
                  <div className="text-gray-600">{formData.tipo || 'Não selecionado'}</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium text-gray-700">Caixa:</div>
                  <div className="text-gray-600">{formData.caixa || 'Não selecionada'}</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium text-gray-700">Arquivos:</div>
                  <div className="text-gray-600">{arquivos.length} arquivo(s)</div>
                </div>
                
                <div className="text-sm">
                  <div className="font-medium text-gray-700">Tags:</div>
                  <div className="text-gray-600">{tags.length} tag(s)</div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button type="submit" className="w-full">
                    Salvar Documento
                  </Button>
                  <Button type="button" variant="outline" className="w-full">
                    Salvar como Rascunho
                  </Button>
                  <Button type="button" variant="ghost" className="w-full">
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
