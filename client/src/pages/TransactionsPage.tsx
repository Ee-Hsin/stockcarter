import React from 'react'

const tableItems = [
  {
    name: 'Solo learn app',
    date: 'Oct 9, 2023',
    status: 'Active',
    price: '$35.000',
    plan: 'Monthly subscription',
  },
  {
    name: 'Window wrapper',
    date: 'Oct 12, 2023',
    status: 'Active',
    price: '$12.000',
    plan: 'Monthly subscription',
  },
  {
    name: 'Unity loroin',
    date: 'Oct 22, 2023',
    status: 'Archived',
    price: '$20.000',
    plan: 'Annually subscription',
  },
  {
    name: 'Background remover',
    date: 'Jan 5, 2023',
    status: 'Active',
    price: '$5.000',
    plan: 'Monthly subscription',
  },
  {
    name: 'Colon tiger',
    date: 'Jan 6, 2023',
    status: 'Active',
    price: '$9.000',
    plan: 'Annually subscription',
  },
]

const TransactionsPage: React.FC = () => {
  return (
    <div className="bg-customSecondary">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12 relative h-max overflow-auto bg-white">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 px-3">
                  Date <a className="text-xs">(YYYY-MM-DD)</a>
                </th>
                <th className="py-3 px-6">Currency</th>
                <th className="py-3 px-6">Ticker</th>
                <th className="py-3 px-6">Buy/Sell</th>
                <th className="py-3 px-6">Units</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Notes</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {tableItems.map((item, idx) => (
                <tr key={idx}>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.date}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-2 rounded-full font-semibold text-xs ${item.status == 'Active' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.plan}</td>
                  <td className="pr-6 py-4 whitespace-nowrap">{item.price}</td>
                  <td className="text-right whitespace-nowrap">
                    <a
                      href="javascript:void()"
                      className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg"
                    >
                      Manage
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage
