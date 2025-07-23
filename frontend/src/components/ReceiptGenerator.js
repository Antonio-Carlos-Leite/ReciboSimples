import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const ReceiptGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    barcode: '',
    value: '',
    date: '',
    observation: ''
  });
  
  const [generatedReceipts, setGeneratedReceipts] = useState([]);
  const [paperWidth, setPaperWidth] = useState('80mm');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    // Auto-fill current date
    const today = new Date().toISOString().split('T')[0];
    setFormData(prev => ({ ...prev, date: today }));
  }, []);

  const formatCurrency = (value) => {
    // Remove non-digits
    const numericValue = value.replace(/\D/g, '');
    
    if (!numericValue) return '';
    
    // Convert to float and format
    const floatValue = parseFloat(numericValue) / 100;
    return floatValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const handleValueChange = (e) => {
    const formatted = formatCurrency(e.target.value);
    setFormData(prev => ({ ...prev, value: formatted }));
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateBarcode = (text) => {
    // Simple visual barcode representation
    const chars = text.split('');
    return chars.map((char, index) => {
      const charCode = char.charCodeAt(0);
      const width = (charCode % 4) + 1;
      const height = (charCode % 3) + 8;
      return (
        <div
          key={index}
          className="bg-black inline-block mr-0.5"
          style={{
            width: `${width}px`,
            height: `${height}px`
          }}
        />
      );
    });
  };

  const generateReceipt = () => {
    if (!formData.companyName || !formData.barcode || !formData.value) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const receipt = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toLocaleString('pt-BR')
      };

      setGeneratedReceipts([receipt]);
      setIsGenerating(false);
    }, 1000);
  };

  const simulatePrint = () => {
    alert('Simulando impressão térmica...\n\n✓ Via do Cliente - Enviada para impressão\n✓ Via da Empresa - Enviada para impressão\n\nImpressão concluída!');
  };

  const Receipt = ({ data, viaType }) => (
    <div className={`bg-white text-black p-4 font-mono text-sm border-2 border-dashed border-gray-400 ${paperWidth === '58mm' ? 'w-64' : 'w-80'}`}>
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="font-bold text-lg mb-1">{data.companyName}</h2>
        <p className="text-xs">"Este documento não é uma nota fiscal."
              "Recibo simplificado - sem valor fiscal."</p>
        <p className="text-xs font-bold mt-2">{viaType}</p>
      </div>
      
      <Separator className="my-3" />
      
      {/* Barcode */}
      <div className="mb-4">
        <p className="text-xs mb-2">CÓDIGO DE BARRAS:</p>
        <div className="flex justify-center mb-2 h-12 items-end">
          {generateBarcode(data.barcode)}
        </div>
        <p className="text-center text-xs font-mono">{data.barcode}</p>
      </div>
      
      <Separator className="my-3" />
      
      {/* Value */}
      <div className="mb-4">
        <div className="flex justify-between">
          <span className="text-xs">VALOR:</span>
          <span className="font-bold text-lg">{data.value}</span>
        </div>
      </div>
      
      {/* Date */}
      <div className="mb-4">
        <div className="flex justify-between text-xs">
          <span>DATA:</span>
          <span>{new Date(data.date).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
      
      {/* Observation */}
      {data.observation && (
        <div className="mb-4">
          <p className="text-xs mb-1">OBSERVAÇÃO:</p>
          <p className="text-xs break-words">{data.observation}</p>
        </div>
      )}
      
      <Separator className="my-3" />
      
      {/* Footer */}
      <div className="text-center text-xs">
        <p>Emitido em: {data.timestamp}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            🧾 Sistema de Emissão de Recibos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="paperWidth">Largura do Papel</Label>
              <Select value={paperWidth} onValueChange={setPaperWidth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="58mm">58mm</SelectItem>
                  <SelectItem value="80mm">80mm</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="companyName">Nome da Empresa *</Label>
                <Input
                  id="companyName"
                  placeholder="Digite o nome da empresa"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="barcode">Código de Barras *</Label>
                <Input
                  id="barcode"
                  placeholder="Digite o código de barras"
                  value={formData.barcode}
                  onChange={(e) => handleInputChange('barcode', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="value">Valor (R$) *</Label>
                <Input
                  id="value"
                  placeholder="R$ 0,00"
                  value={formData.value}
                  onChange={handleValueChange}
                />
              </div>

              <div>
                <Label htmlFor="date">Data</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="observation">Observação</Label>
                <Textarea
                  id="observation"
                  placeholder="Observações adicionais (opcional)"
                  value={formData.observation}
                  onChange={(e) => handleInputChange('observation', e.target.value)}
                  rows={3}
                />
              </div>

              <Button 
                onClick={generateReceipt} 
                className="w-full text-lg py-6"
                disabled={isGenerating}
              >
                {isGenerating ? '🔄 Gerando...' : '📄 Gerar Recibo'}
              </Button>
            </div>

            {/* Preview Area */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Preview</h3>
              {formData.companyName && formData.barcode && formData.value ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  <Receipt data={formData} viaType="PREVIEW" />
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>Preencha os campos para ver o preview</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Receipts */}
      {generatedReceipts.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recibos Gerados</CardTitle>
              <Button onClick={simulatePrint} variant="outline">
                🖨️ Imprimir Duas Vias
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {generatedReceipts.map(receipt => (
                <React.Fragment key={receipt.id}>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-center">Via do Cliente</h4>
                    <Receipt data={receipt} viaType="VIA DO CLIENTE" />
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold text-center">Via da Empresa</h4>
                    <Receipt data={receipt} viaType="VIA DA EMPRESA" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ReceiptGenerator;