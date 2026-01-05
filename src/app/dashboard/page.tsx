'use client';

import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingCart, Users, DollarSign } from 'lucide-react';

// Dummy sales data
const salesData = [
  { month: 'Jan', sales: 2400, revenue: 9600 },
  { month: 'Feb', sales: 3200, revenue: 12800 },
  { month: 'Mar', sales: 2800, revenue: 11200 },
  { month: 'Apr', sales: 3900, revenue: 15600 },
  { month: 'May', sales: 4200, revenue: 16800 },
  { month: 'Jun', sales: 4800, revenue: 19200 },
];

// Category breakdown
const categoryData = [
  { name: 'Lipstick', value: 45, color: '#FF1493' },
  { name: 'Eyeshadow', value: 30, color: '#9370DB' },
  { name: 'Blush', value: 25, color: '#FFB6C1' },
];

// Most sold products
const productsData = [
  { name: 'Mauve Sophistication', brand: 'Dior', sold: 1250, revenue: 55000 },
  { name: 'Night Sky', brand: 'Anastasia Beverly Hills', sold: 989, revenue: 34615 },
  { name: 'Sunset Shimmer', brand: 'Urban Decay', sold: 856, revenue: 23968 },
  { name: 'Ruby Romance', brand: 'MAC', sold: 745, revenue: 34255 },
  { name: 'Pink Bliss', brand: 'Charlotte Tilbury', sold: 698, revenue: 36296 },
];

// Key metrics
const metrics = [
  { label: 'Total Sales', value: '18,968', icon: ShoppingCart, color: 'bg-blue-500/10' },
  { label: 'Total Revenue', value: '$899,134', icon: DollarSign, color: 'bg-green-500/10' },
  { label: 'Active Users', value: '2,847', icon: Users, color: 'bg-purple-500/10' },
  { label: 'Growth Rate', value: '+23.5%', icon: TrendingUp, color: 'bg-pink-500/10' },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold font-headline mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-muted-foreground">Track your beauty brand performance in real-time</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <Card key={idx} className={`p-6 ${metric.color}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                    <p className="text-3xl font-bold">{metric.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-muted-foreground opacity-50" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Sales Trend */}
          <Card className="lg:col-span-2 p-6">
            <h2 className="text-2xl font-bold mb-6 font-headline">Sales Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    border: '1px solid var(--border)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#FF1493" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="revenue" stroke="#9370DB" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Category Breakdown */}
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 font-headline">Category Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Top Products */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-6 font-headline">Top Selling Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Product</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Brand</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Units Sold</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {productsData.map((product, idx) => (
                  <tr key={idx} className="border-b hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{product.name}</td>
                    <td className="py-4 px-4 text-muted-foreground">{product.brand}</td>
                    <td className="py-4 px-4 text-right">
                      <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {product.sold.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right font-semibold">
                      ${product.revenue.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Note about Dior */}
        <Card className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🏆</div>
            <div>
              <h3 className="text-lg font-bold mb-2">Star Product Alert!</h3>
              <p className="text-muted-foreground">
                <strong>Mauve Sophistication by Dior</strong> is our top-performing product with 1,250+ units sold this month! 
                This elegant mauve eyeshadow has captured the hearts of our beauty enthusiasts. Consider increasing inventory to meet the high demand.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
