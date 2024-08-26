import { useGetTransactions } from '../hooks/queries/transactionQuery'

const TransactionsTable: React.FC = () => {
  const {
    data: transactionsList,
    isError,
    isPending,
    error,
  } = useGetTransactions()

  return (
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
            {transactionsList &&
              transactionsList.map((transaction, idx) => (
                <tr key={idx}>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {new Date(transaction.date).toLocaleString()}
                    {/* <-- have to do some conversion here to make it presentable */}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {transaction.currency}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {transaction.ticker}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {transaction.transactionType}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {transaction.units}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {transaction.price}
                  </td>
                  <td className="pr-6 py-4 whitespace-nowrap">
                    {transaction.notes}
                  </td>
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
  )
}

export default TransactionsTable
