// Mock data for receipt system
export const mockCompanies = [
  'ACME Comércio Ltda',
  'Tech Solutions Brasil',
  'Loja do João',
  'Mercado Central',
  'Serviços Express'
];

export const mockBarcodes = [
  '7891234567890',
  '1234567890123',
  '9876543210987',
  '5555666677778',
  '1111222233334'
];

export const mockValues = [
  'R$ 25,50',
  'R$ 150,00',
  'R$ 89,99',
  'R$ 350,75',
  'R$ 12,30'
];

export const mockObservations = [
  'Pagamento à vista',
  'Produto conforme pedido',
  'Entrega realizada',
  'Serviço prestado',
  ''
];

// Sample receipt data
export const sampleReceipt = {
  id: 1,
  companyName: 'ACME Comércio Ltda',
  barcode: '7891234567890',
  value: 'R$ 125,50',
  date: '2025-01-15',
  observation: 'Pagamento à vista - Produto conforme pedido',
  timestamp: '15/01/2025 14:30:25'
};

// Function to generate random receipt data
export const generateMockReceipt = () => {
  const randomIndex = Math.floor(Math.random() * mockCompanies.length);
  return {
    id: Date.now(),
    companyName: mockCompanies[randomIndex],
    barcode: mockBarcodes[randomIndex],
    value: mockValues[randomIndex],
    date: new Date().toISOString().split('T')[0],
    observation: mockObservations[randomIndex],
    timestamp: new Date().toLocaleString('pt-BR')
  };
};