// To run: npm install && npm run dev
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

interface PayoutRequest {
  id: string;
  ccp: string;
  cardInfo: string;
  amount: number;
  merchantId?: string;
  createdAt: string;
  status: 'pending' | 'paid' | 'not_paid';
}

const payoutRequests: PayoutRequest[] = [];

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  balance: number;
}

const customers: Customer[] = [];

app.post('/api/payout-requests', (req: Request, res: Response) => {
  const { ccp, cardInfo, amount, merchantId } = req.body;
  if (!ccp && !cardInfo) {
    return res.status(400).json({ error: 'CCP or Card Info required' });
  }
  if (!amount) {
    return res.status(400).json({ error: 'Amount required' });
  }
  const payout: PayoutRequest = {
    id: Math.random().toString(36).substr(2, 9),
    ccp: ccp || '',
    cardInfo: cardInfo || '',
    amount,
    merchantId,
    createdAt: new Date().toISOString(),
    status: 'pending',
  };
  payoutRequests.push(payout);
  res.status(201).json({ success: true, payout });
});

app.get('/api/payout-requests', (_req: Request, res: Response) => {
  res.json(payoutRequests);
});

app.patch('/api/payout-requests/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  const payout = payoutRequests.find(p => p.id === id);
  if (!payout) {
    return res.status(404).json({ error: 'Payout request not found' });
  }
  if (!['pending', 'paid', 'not_paid'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  payout.status = status;
  res.json({ success: true, payout });
});

// Create a customer
app.post('/api/customers', (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }
  const exists = customers.some(c => c.email === email);
  if (exists) {
    return res.status(409).json({ error: 'Customer with this email already exists' });
  }
  const customer: Customer = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    phone,
    balance: 0,
  };
  customers.push(customer);
  res.status(201).json({ success: true, customer });
});

// Get all customers
app.get('/api/customers', (_req: Request, res: Response) => {
  res.json(customers);
});

// Get a single customer by ID
app.get('/api/customers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = customers.find(c => c.id === id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  res.json(customer);
});

// Update customer balance
app.patch('/api/customers/:id/balance', (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount } = req.body;
  const customer = customers.find(c => c.id === id);
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  if (typeof amount !== 'number') {
    return res.status(400).json({ error: 'Amount must be a number' });
  }
  customer.balance += amount;
  res.json({ success: true, customer });
});

// Delete a customer
app.delete('/api/customers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const idx = customers.findIndex(c => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  customers.splice(idx, 1);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
}); 