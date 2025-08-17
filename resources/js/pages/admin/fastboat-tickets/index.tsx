import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface FastboatTicket {
    id: number;
    name: string;
    departure_location: string;
    arrival_location: string;
    departure_time: string;
    price: number;
    capacity: number;
    is_active: boolean;
    bookings_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedTickets {
    data: FastboatTicket[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    tickets: PaginatedTickets;
    [key: string]: unknown;
}

export default function FastboatTicketsIndex({ tickets }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatTime = (time: string) => {
        return new Date('2000-01-01 ' + time).toLocaleTimeString('id-ID', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppShell>
            <Head title="Manage Fastboat Tickets" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🚤 Fastboat Tickets
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-2">
                            Manage schedules, prices, and capacity
                        </p>
                    </div>
                    <Link
                        href={route('admin.fastboat-tickets.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ➕ Add New Ticket
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">🎫</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Tickets
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {tickets.total}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Active Tickets
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {tickets.data.filter(t => t.is_active).length}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <span className="text-3xl">📊</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Bookings
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {tickets.data.reduce((sum, t) => sum + t.bookings_count, 0)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            All Fastboat Tickets
                        </h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Route
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Schedule
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Capacity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Bookings
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                {tickets.data.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                        <td className="px-6 py-4">
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {ticket.name}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {ticket.departure_location} → {ticket.arrival_location}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                <span className="mr-1">⏰</span>
                                                {formatTime(ticket.departure_time)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {formatCurrency(ticket.price)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center text-sm text-gray-900 dark:text-white">
                                                <span className="mr-1">👥</span>
                                                {ticket.capacity}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 dark:text-white">
                                                {ticket.bookings_count}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                                ticket.is_active 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                            }`}>
                                                {ticket.is_active ? '✅ Active' : '❌ Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex space-x-2">
                                                <Link
                                                    href={route('admin.fastboat-tickets.show', ticket.id)}
                                                    className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    👁️ View
                                                </Link>
                                                <Link
                                                    href={route('admin.fastboat-tickets.edit', ticket.id)}
                                                    className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300"
                                                >
                                                    ✏️ Edit
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {tickets.data.length === 0 && (
                        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                            <span className="text-4xl block mb-2">🚤</span>
                            No fastboat tickets found. Create your first ticket to get started!
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {tickets.last_page > 1 && (
                    <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Showing {((tickets.current_page - 1) * tickets.per_page) + 1} to{' '}
                                {Math.min(tickets.current_page * tickets.per_page, tickets.total)} of{' '}
                                {tickets.total} results
                            </div>
                            <div className="flex space-x-1">
                                {tickets.links.map((link, index) => (
                                    link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-3 py-2 text-sm rounded ${
                                                link.active 
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ) : (
                                        <span 
                                            key={index}
                                            className="px-3 py-2 text-sm text-gray-400 dark:text-gray-600"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}