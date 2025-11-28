import React from 'react';
import { Download, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAdminTheme } from '../../../contexts/AdminThemeContext';

const BillingTable = ({ transactions }) => {
  const { isDarkMode } = useAdminTheme();

  const statusStyles = {
    paid: 'bg-emerald-500/10 text-emerald-500',
    pending: 'bg-orange-500/10 text-orange-500',
    failed: 'bg-red-500/10 text-red-500',
  };

  const statusIcons = {
    paid: <CheckCircle size={14} />,
    pending: <Clock size={14} />,
    failed: <XCircle size={14} />,
  };

  return (
    <div className={`rounded-xl border overflow-hidden ${isDarkMode ? 'bg-admin-dark-card border-admin-dark-border' : 'bg-white border-gray-100'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className={`text-xs uppercase tracking-wider ${isDarkMode ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-500'}`}>
              <th className="p-4 font-medium">Invoice ID</th>
              <th className="p-4 font-medium">Doctor</th>
              <th className="p-4 font-medium">Plan</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Method</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-100'}`}>
            {transactions.map((tx) => (
              <tr key={tx.id} className={`transition-colors ${isDarkMode ? 'hover:bg-gray-800/50 text-gray-300' : 'hover:bg-gray-50 text-gray-700'}`}>
                <td className="p-4 font-mono text-xs">{tx.id}</td>
                <td className="p-4 text-sm font-medium">{tx.doctor}</td>
                <td className="p-4 text-sm">{tx.plan}</td>
                <td className="p-4 text-sm font-bold">${tx.amount}</td>
                <td className="p-4 text-sm">{tx.date}</td>
                <td className="p-4 text-sm flex items-center gap-2">
                  <img src={`https://placehold.co/24x16?text=${tx.method}`} alt={tx.method} className="h-4 rounded" />
                  {tx.method}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 w-fit
                    ${statusStyles[tx.status]}`}>
                    {statusIcons[tx.status]} {tx.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
                    <Download size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingTable;
