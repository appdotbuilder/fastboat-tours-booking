import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';

interface BookableItem {
    id: number;
    name: string;
    description: string;
    price: number;
    departure_location?: string;
    arrival_location?: string;
    departure_time?: string;
    capacity?: number;
    duration_days?: number;
}

interface Props {
    bookable: BookableItem;
    bookableType: string;
    [key: string]: unknown;
}



export default function CreateBooking({ bookable, bookableType }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        quantity: 1,
        booking_date: '',
        bookable_type: bookableType === 'fastboat' ? 'App\\Models\\FastboatTicket' : 'App\\Models\\TourPackage',
        bookable_id: bookable.id,
        payment_method: 'credit_card',
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const totalAmount = bookable.price * data.quantity;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('booking.store'));
    };

    return (
        <>
            <Head title={`Book ${bookable.name}`} />
            
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
                            Complete Your Booking 🎫
                        </h1>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Booking Details */}
                        <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                {bookableType === 'fastboat' ? '🚤' : '🏝️'} Booking Details
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                                        {bookable.name}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                                        {bookable.description}
                                    </p>
                                </div>

                                {bookableType === 'fastboat' && (
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span>📍</span>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                {bookable.departure_location} → {bookable.arrival_location}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span>⏰</span>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                Departure: {bookable.departure_time}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {bookableType === 'tour' && (
                                    <div className="flex items-center space-x-2 text-sm">
                                        <span>📅</span>
                                        <span className="text-gray-600 dark:text-gray-300">
                                            Duration: {bookable.duration_days} day{bookable.duration_days && bookable.duration_days > 1 ? 's' : ''}
                                        </span>
                                    </div>
                                )}

                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="font-medium text-gray-900 dark:text-white">Price per person:</span>
                                        <span className="font-bold text-blue-600">
                                            {formatCurrency(bookable.price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                👤 Your Information
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="Enter your full name"
                                        required
                                    />
                                    {errors.customer_name && (
                                        <p className="mt-1 text-sm text-red-600">{errors.customer_name}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        value={data.customer_email}
                                        onChange={(e) => setData('customer_email', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                    {errors.customer_email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.customer_email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.customer_phone}
                                        onChange={(e) => setData('customer_phone', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        placeholder="+62 812 3456 7890"
                                        required
                                    />
                                    {errors.customer_phone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.customer_phone}</p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Quantity *
                                        </label>
                                        <select
                                            value={data.quantity}
                                            onChange={(e) => setData('quantity', parseInt(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        >
                                            {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                                <option key={num} value={num}>
                                                    {num} {bookableType === 'fastboat' ? 'ticket' : 'person'}{num > 1 ? 's' : ''}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Date *
                                        </label>
                                        <input
                                            type="date"
                                            value={data.booking_date}
                                            onChange={(e) => setData('booking_date', e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>

                                {(errors.quantity || errors.booking_date) && (
                                    <div className="space-y-1">
                                        {errors.quantity && (
                                            <p className="text-sm text-red-600">{errors.quantity}</p>
                                        )}
                                        {errors.booking_date && (
                                            <p className="text-sm text-red-600">{errors.booking_date}</p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Payment Method *
                                    </label>
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                value="credit_card"
                                                checked={data.payment_method === 'credit_card'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="text-blue-600"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <span>💳</span>
                                                <span className="text-gray-900 dark:text-white">Credit Card</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                value="bank_transfer"
                                                checked={data.payment_method === 'bank_transfer'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="text-blue-600"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <span>🏦</span>
                                                <span className="text-gray-900 dark:text-white">Bank Transfer</span>
                                            </div>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="radio"
                                                value="pay_at_office"
                                                checked={data.payment_method === 'pay_at_office'}
                                                onChange={(e) => setData('payment_method', e.target.value)}
                                                className="text-blue-600"
                                            />
                                            <div className="flex items-center space-x-2">
                                                <span>🏢</span>
                                                <span className="text-gray-900 dark:text-white">Pay at Office</span>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Total Amount */}
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span className="text-gray-900 dark:text-white">Total Amount:</span>
                                        <span className="text-green-600">
                                            {formatCurrency(totalAmount)}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
                                >
                                    {processing ? 'Processing...' : 'Proceed to Payment 💳'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}