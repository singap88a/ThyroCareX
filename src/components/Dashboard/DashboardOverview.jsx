import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Activity,
  CreditCard,
  HardDrive,
  TrendingUp,
  Clock
} from 'lucide-react';
import './AdminDashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import StatCard from './StatCard';
import ChartCard from './ChartCard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardOverview = () => {
  const [timeRange, setTimeRange] = useState('week');

  // Sample data - replace with real API data
  const stats = [
    {
      icon: Users,
      value: 248,
      label: 'Registered Doctors',
      trend: 'up',
      trendValue: '+12%',
      footer: 'vs last month',
      variant: 'primary'
    },
    {
      icon: FileText,
      value: 1847,
      label: 'Total Diagnoses',
      trend: 'up',
      trendValue: '+23%',
      footer: 'vs last month',
      variant: 'success'
    },
    {
      icon: Activity,
      value: 156,
      label: 'AI Diagnoses Today',
      trend: 'up',
      trendValue: '+8%',
      footer: 'vs yesterday',
      variant: 'warning'
    },
    {
      icon: CreditCard,
      value: 89,
      label: 'Active Subscriptions',
      trend: 'up',
      trendValue: '+5%',
      footer: 'vs last month',
      variant: 'primary'
    },
    {
      icon: HardDrive,
      value: '24.5 GB',
      label: 'Storage Used',
      trend: 'up',
      trendValue: '+2.1 GB',
      footer: 'this month',
      variant: 'danger'
    },
    {
      icon: TrendingUp,
      value: '98.5%',
      label: 'AI Accuracy',
      trend: 'up',
      trendValue: '+0.3%',
      footer: 'vs last week',
      variant: 'success'
    }
  ];

  // Line Chart Data - Diagnoses Over Time
  const diagnosesChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Diagnoses',
        data: [45, 52, 48, 65, 58, 72, 68],
        borderColor: '#4695a5',
        backgroundColor: 'rgba(70, 149, 165, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: '#4695a5',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 8
      }
    ]
  };

  // Bar Chart Data - Subscriptions by Plan
  const subscriptionsChartData = {
    labels: ['Free', 'Basic', 'Pro', 'Enterprise'],
    datasets: [
      {
        label: 'Active Subscriptions',
        data: [159, 45, 28, 12],
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          '#6366f1',
          '#10b981',
          '#f59e0b',
          '#ef4444'
        ],
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  // Doughnut Chart Data - AI Model Usage
  const aiUsageChartData = {
    labels: ['Thyroid Detection', 'Classification', 'Risk Assessment'],
    datasets: [
      {
        data: [65, 25, 10],
        backgroundColor: [
          'rgba(70, 149, 165, 0.8)',
          'rgba(99, 102, 241, 0.8)',
          'rgba(16, 185, 129, 0.8)'
        ],
        borderColor: [
          '#4695a5',
          '#6366f1',
          '#10b981'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#f1f5f9',
          font: {
            size: 12,
            family: 'Inter'
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(148, 163, 184, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          drawBorder: false
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          }
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#f1f5f9',
          font: {
            size: 12,
            family: 'Inter'
          },
          padding: 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#f1f5f9',
        bodyColor: '#94a3b8',
        borderColor: 'rgba(148, 163, 184, 0.1)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8
      }
    }
  };

  return (
    <div>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="mb-2 text-3xl font-bold" style={{ color: 'var(--admin-text)' }}>
          Dashboard Overview
        </h1>
        <p className="text-[15px] flex items-center gap-2" style={{ color: 'var(--admin-text-muted)' }}>
          <Clock size={16} />
          Last updated: {new Date().toLocaleString()}
        </p>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        {/* Diagnoses Chart */}
        <ChartCard
          title="Diagnoses This Week"
          actions={
            <div className="flex gap-2">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  className={`chart-filter-btn ${timeRange === range ? 'active' : ''}`}
                  onClick={() => setTimeRange(range)}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          }
        >
          <Line data={diagnosesChartData} options={chartOptions} />
        </ChartCard>

        {/* Subscriptions Chart */}
        <ChartCard title="Subscriptions by Plan">
          <Bar data={subscriptionsChartData} options={chartOptions} />
        </ChartCard>
      </div>

      {/* AI Usage Chart & Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="AI Model Usage Distribution">
          <Doughnut data={aiUsageChartData} options={doughnutOptions} />
        </ChartCard>

        {/* Recent Activity */}
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-6">
            <h3 className="chart-card-title">Recent Activity</h3>
          </div>
          <div>
            {[
              { action: 'New doctor registered', doctor: 'Dr. Ahmed Hassan', time: '5 min ago' },
              { action: 'Diagnosis completed', doctor: 'Dr. Sarah Mohamed', time: '12 min ago' },
              { action: 'Subscription upgraded', doctor: 'Dr. Khaled Ali', time: '25 min ago' },
              { action: 'New case submitted', doctor: 'Dr. Fatma Ibrahim', time: '1 hour ago' },
              { action: 'AI model updated', doctor: 'System', time: '2 hours ago' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`py-4 px-6 flex justify-between items-center ${
                  index < 4 ? 'border-b' : ''
                }`}
                style={{
                  borderColor: 'var(--admin-border)',
                  color: 'var(--admin-text)'
                }}
              >
                <div>
                  <div className="text-[15px] mb-1" style={{ color: 'var(--admin-text)' }}>
                    {activity.action}
                  </div>
                  <div className="text-[13px]" style={{ color: 'var(--admin-text-muted)' }}>
                    {activity.doctor}
                  </div>
                </div>
                <div className="text-[13px]" style={{ color: 'var(--admin-text-muted)' }}>
                  {activity.time}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardOverview;
