import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Stats {
    total_fastboat_bookings: number;
    total_tour_bookings: number;
    total_revenue: number;
    pending_bookings: number;
    fastboat_tickets_count: number;
    tour_packages_count: number;
}

interface BookableItem {
    id: number;
    name: string;
    price?: number;
}

interface Booking {
    id: number;
    booking_number: string;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    payment_status: string;
    created_at: string;
    bookable: BookableItem;
    bookable_type: string;
}

interface Props {
    stats: Stats;
    recentBookings: Booking[];
    [key: string]: unknown;
}

export default function AdminDashboard({ stats, recentBookings }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            paid: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
        };
        
        return (
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${badges[status as keyof typeof badges]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getBookableTypeIcon = (type: string) => {
        return type.includes('FastboatTicket') ? '🚤' : '🏝️';
    };

    return (
        <AppShell>
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🚤 Admin Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Manage your fastboat tickets and tour packages
                        </p>
                    </div>
                    <Link
                        href={route('home')}
                        target="_blank"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        View Public Site 🌐
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">💰</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Revenue
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {formatCurrency(stats.total_revenue)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">🚤</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Fastboat Bookings
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.total_fastboat_bookings}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">🏝️</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tour Bookings
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.total_tour_bookings}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Pending Payments
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.pending_bookings}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">🎫</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Active Tickets
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.fastboat_tickets_count}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">📦</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Tour Packages
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.tour_packages_count}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        🚀 Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href={route('admin.fastboat-tickets.create')}
                            className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 p-4 rounded-lg transition-colors group"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">🚤</span>
                                <div>
                                    <p className="font-medium text-blue-900 dark:text-blue-100">
                                        Add Fastboat Ticket
                                    </p>
                                    <p className="text-sm text-blue-600 dark:text-blue-300">
                                        Create new schedule
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <Link
                            href={route('admin.fastboat-tickets.index')}
                            className="bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/40 p-4 rounded-lg transition-colors group"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">📋</span>
                                <div>
                                    <p className="font-medium text-green-900 dark:text-green-100">
                                        Manage Tickets
                                    </p>
                                    <p className="text-sm text-green-600 dark:text-green-300">
                                        View all schedules
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg opacity-75">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">🏝️</span>
                                <div>
                                    <p className="font-medium text-orange-900 dark:text-orange-100">
                                        Manage Tours
                                    </p>
                                    <p className="text-sm text-orange-600 dark:text-orange-300">
                                        Coming soon
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg opacity-75">
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <p className="font-medium text-purple-900 dark:text-purple-100">
                                        View Reports
                                    </p>
                                    <p className="text-sm text-purple-600 dark:text-purple-300">
                                        Coming soon
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            📅 Recent Bookings
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Booking
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Service
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-lg mr-2">
                                                    {getBookableTypeIcon(booking.bookable_type)}
                                                </span>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {booking.booking_number}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {booking.customer_name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {booking.customer_email}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 dark:text-white max-w-xs truncate">
                                                {booking.bookable.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatCurrency(booking.total_amount)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(booking.payment_status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(booking.created_at).toLocaleDateString('id-ID')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {recentBookings.length === 0 && (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            <span className="text-4xl block mb-2">📭</span>
                            No bookings yet. Start promoting your services!
                        </div>
                    )}
                </div>
            </div>
        </AppShell>
    );
}