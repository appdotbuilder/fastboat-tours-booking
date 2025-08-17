import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

interface BookableItem {
    id: number;
    name: string;
    price: number;
    departure_location?: string;
    arrival_location?: string;
    departure_time?: string;
    duration_days?: number;
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
    payment_reference?: string;
    paid_at?: string;
    bookable: BookableItem;
    bookable_type: string;
}

interface Props {
    booking: Booking;
    [key: string]: unknown;
}

export default function BookingShow({ booking }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getPaymentStatusBadge = (status: string) => {
        const badges = {
            paid: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
        };
        
        const icons = {
            paid: '✅',
            pending: '⏳',
            cancelled: '❌',
        };

        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badges[status as keyof typeof badges]}`}>
                <span className="mr-1">{icons[status as keyof typeof icons]}</span>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getBookableTypeIcon = (type: string) => {
        return type.includes('FastboatTicket') ? '🚤' : '🏝️';
    };

    const getPaymentMethodDisplay = (method: string) => {
        const methods = {
            credit_card: '💳 Credit Card',
            bank_transfer: '🏦 Bank Transfer',
            pay_at_office: '🏢 Pay at Office',
        };
        return methods[method as keyof typeof methods] || method;
    };

    return (
        <>
            <Head title={`Booking Details - ${booking.booking_number}`} />
            
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
                        
                        {flash?.success && (
                            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200">
                                <div className="flex items-center">
                                    <span className="text-xl mr-2">🎉</span>
                                    <span>{flash.success}</span>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    Booking Confirmed! 🎫
                                </h1>
                                <p className="text-gray-600 dark:text-gray-300 mt-2">
                                    Booking Number: <span className="font-mono font-semibold text-lg">{booking.booking_number}</span>
                                </p>
                            </div>
                            <div>
                                {getPaymentStatusBadge(booking.payment_status)}
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Booking Details */}
                        <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                {getBookableTypeIcon(booking.bookable_type)} Booking Details
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                                        {booking.bookable.name}
                                    </h3>
                                    
                                    {booking.bookable_type.includes('FastboatTicket') && (
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <span>📍</span>
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    {booking.bookable.departure_location} → {booking.bookable.arrival_location}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span>⏰</span>
                                                <span className="text-gray-600 dark:text-gray-300">
                                                    Departure: {booking.bookable.departure_time}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {booking.bookable_type.includes('TourPackage') && (
                                        <div className="flex items-center space-x-2 text-sm">
                                            <span>📅</span>
                                            <span className="text-gray-600 dark:text-gray-300">
                                                Duration: {booking.bookable.duration_days} day{booking.bookable.duration_days && booking.bookable.duration_days > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Quantity:</span>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {booking.quantity}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Date:</span>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {new Date(booking.booking_date).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex justify-between items-center text-xl">
                                        <span className="font-semibold text-gray-900 dark:text-white">Total Amount:</span>
                                        <span className="font-bold text-green-600">
                                            {formatCurrency(booking.total_amount)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Customer & Payment Info */}
                        <div className="space-y-6">
                            {/* Customer Information */}
                            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    👤 Customer Information
                                </h2>

                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Full Name:</span>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {booking.customer_name}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Email:</span>
                                        <p className="text-gray-900 dark:text-white">
                                            {booking.customer_email}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Phone:</span>
                                        <p className="text-gray-900 dark:text-white">
                                            {booking.customer_phone}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Information */}
                            <div className="bg-white rounded-xl shadow-lg p-6 dark:bg-gray-800">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                    💳 Payment Information
                                </h2>

                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Payment Method:</span>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {getPaymentMethodDisplay(booking.payment_method)}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">Status:</span>
                                        <div className="mt-1">
                                            {getPaymentStatusBadge(booking.payment_status)}
                                        </div>
                                    </div>
                                    {booking.payment_reference && (
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-300 text-sm">Reference:</span>
                                            <p className="font-mono text-gray-900 dark:text-white">
                                                {booking.payment_reference}
                                            </p>
                                        </div>
                                    )}
                                    {booking.paid_at && (
                                        <div>
                                            <span className="text-gray-600 dark:text-gray-300 text-sm">Paid At:</span>
                                            <p className="text-gray-900 dark:text-white">
                                                {new Date(booking.paid_at).toLocaleDateString('id-ID', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* E-ticket Information */}
                    {booking.payment_status === 'paid' && (
                        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6 dark:bg-green-900/20 dark:border-green-800">
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="text-2xl">🎫</span>
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                                    E-Ticket Ready!
                                </h3>
                            </div>
                            <p className="text-green-700 dark:text-green-300 mb-4">
                                Your e-ticket has been generated and sent to your email address. 
                                Please check your inbox (including spam folder) for the PDF ticket with QR code.
                            </p>
                            <div className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <p className="text-sm text-green-700 dark:text-green-300">
                                    📧 <strong>Important:</strong> Please present your e-ticket (printed or digital) 
                                    and a valid ID at the departure point. Arrive at least 30 minutes before departure time.
                                </p>
                            </div>
                        </div>
                    )}

                    {booking.payment_status === 'pending' && (
                        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6 dark:bg-yellow-900/20 dark:border-yellow-800">
                            <div className="flex items-center space-x-3 mb-4">
                                <span className="text-2xl">⏳</span>
                                <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200">
                                    Payment Pending
                                </h3>
                            </div>
                            <p className="text-yellow-700 dark:text-yellow-300 mb-4">
                                Your booking is confirmed but payment is still pending. 
                                {booking.payment_method === 'pay_at_office' 
                                    ? ' Please visit our office to complete payment before your departure date.' 
                                    : ' Your e-ticket will be generated once payment is confirmed.'}
                            </p>
                            {booking.payment_method !== 'pay_at_office' && (
                                <Link
                                    href={route('payment.show', booking.booking_number)}
                                    className="inline-flex items-center bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                                >
                                    Complete Payment 💳
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}