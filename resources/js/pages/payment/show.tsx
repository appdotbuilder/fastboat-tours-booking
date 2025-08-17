import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface BookableItem {
    id: number;
    name: string;
    price: number;
}

interface Booking {
    id: number;
    booking_number: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    quantity: number;
    booking_date: string;
    total_amount: number;
    payment_method: string;
    payment_status: string;
    bookable: BookableItem;
}

interface BankDetails {
    bank_name: string;
    account_number: string;
    account_name: string;
    branch: string;
}

interface Props {
    booking: Booking;
    bankDetails: BankDetails;
    [key: string]: unknown;
}

export default function PaymentShow({ booking, bankDetails }: Props) {
    const { setData, post, processing } = useForm({
        payment_method: booking.payment_method,
        payment_reference: '',
    });
    const [paymentReference, setPaymentReference] = useState('');

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const handlePaymentConfirmation = (method: string) => {
        setData({
            payment_method: method,
            payment_reference: method === 'bank_transfer' ? paymentReference : '',
        });
        post(route('payment.store', booking.booking_number));
    };

    const getPaymentMethodIcon = (method: string) => {
        switch (method) {
            case 'credit_card': return '💳';
            case 'bank_transfer': return '🏦';
            case 'pay_at_office': return '🏢';
            default: return '💰';
        }
    };

    const getPaymentMethodName = (method: string) => {
        switch (method) {
            case 'credit_card': return 'Credit Card';
            case 'bank_transfer': return 'Bank Transfer';
            case 'pay_at_office': return 'Pay at Office';
            default: return 'Unknown';
        }
    };

    return (
        <>
            <Head title={`Payment - ${booking.booking_number}`} />
            
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <Link 
                            href={route('home')} 
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
                        >
                            ← Back to Homepage
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Complete Payment 💳
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Booking Number: <span className="font-mono font-semibold">{booking.booking_number}</span>
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Booking Summary */}
                        <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                📋 Booking Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Service:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {booking.bookable.name}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Customer:</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {booking.customer_name}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Email:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {booking.customer_email}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Phone:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {booking.customer_phone}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Quantity:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {booking.quantity}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-600 dark:text-gray-300">Date:</span>
                                    <span className="text-gray-900 dark:text-white">
                                        {new Date(booking.booking_date).toLocaleDateString('id-ID', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </span>
                                </div>

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-xl">
                                        <span className="font-semibold text-gray-900 dark:text-white">
                                            Total Amount:
                                        </span>
                                        <span className="font-bold text-green-600">
                                            {formatCurrency(booking.total_amount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Options */}
                        <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                {getPaymentMethodIcon(booking.payment_method)} Payment Method: {getPaymentMethodName(booking.payment_method)}
                            </h2>

                            {booking.payment_method === 'credit_card' && (
                                <div className="space-y-6">
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                        <p className="text-blue-800 dark:text-blue-200 text-sm">
                                            💳 You will be redirected to our secure payment gateway to complete your credit card payment.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => handlePaymentConfirmation('credit_card')}
                                        disabled={processing}
                                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : 'Pay with Credit Card 💳'}
                                    </button>
                                </div>
                            )}

                            {booking.payment_method === 'bank_transfer' && (
                                <div className="space-y-6">
                                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                                        <h3 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                                            Bank Transfer Details:
                                        </h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-green-700 dark:text-green-300">Bank:</span>
                                                <span className="font-mono font-semibold text-green-800 dark:text-green-200">
                                                    {bankDetails.bank_name}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-green-700 dark:text-green-300">Account Number:</span>
                                                <span className="font-mono font-semibold text-green-800 dark:text-green-200">
                                                    {bankDetails.account_number}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-green-700 dark:text-green-300">Account Name:</span>
                                                <span className="font-semibold text-green-800 dark:text-green-200">
                                                    {bankDetails.account_name}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-green-700 dark:text-green-300">Branch:</span>
                                                <span className="text-green-800 dark:text-green-200">
                                                    {bankDetails.branch}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Payment Reference (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={paymentReference}
                                            onChange={(e) => setPaymentReference(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            placeholder="Enter transfer reference number"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            You can add this later if you don't have it yet
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handlePaymentConfirmation('bank_transfer')}
                                        disabled={processing}
                                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : 'I Have Made the Transfer 🏦'}
                                    </button>
                                </div>
                            )}

                            {booking.payment_method === 'pay_at_office' && (
                                <div className="space-y-6">
                                    <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                                        <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-3">
                                            Office Payment Information:
                                        </h3>
                                        <div className="text-sm space-y-2 text-orange-700 dark:text-orange-300">
                                            <p>📍 <strong>Address:</strong> Jl. Bypass Ngurah Rai No. 100, Sanur, Bali</p>
                                            <p>🕒 <strong>Operating Hours:</strong> Daily 07:00 - 19:00</p>
                                            <p>📞 <strong>Phone:</strong> +62 361 123 4567</p>
                                        </div>
                                    </div>

                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                                        <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                                            ⚠️ <strong>Important:</strong> Please bring your booking number and ID when visiting our office. 
                                            Payment must be made at least 24 hours before your departure date.
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => handlePaymentConfirmation('pay_at_office')}
                                        disabled={processing}
                                        className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50"
                                    >
                                        {processing ? 'Processing...' : 'Confirm Office Payment 🏢'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}