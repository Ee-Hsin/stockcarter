import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Loader } from './UI/Loader'
import { FailureModal } from './UI/FailureModal'
import {
  CurrencyEnum,
  TransactionType,
  Transaction,
} from '../types/transactionTypes'
import { usePostTransaction } from '../hooks/queries/transactionQuery'
import { Navigate } from 'react-router-dom'

export const AddTransactionModal: React.FC = () => {
  const [open, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
  }

  return open ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={handleClose}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-4 mx-auto bg-customPrimary rounded-md shadow-lg">
          <form
            className="space-y-6 w-full max-w-md"
            // onSubmit={handleSubmit(onSubmit)}
          ></form>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}
