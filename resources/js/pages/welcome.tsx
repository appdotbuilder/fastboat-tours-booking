import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

interface FastboatTicket {
    id: number;
    name: string;
    description: string;
    departure_location: string;
    arrival_location: string;
    departure_time: string;
    price: number;
    capacity: number;
}

interface TourPackage {
    id: number;
    name: string;
    description: string;
    price: number;
    duration_days: number;
    image_path: string | null;
}

interface Props {
    fastboatTickets: FastboatTicket[];
    tourPackages: TourPackage[];
    [key: string]: unknown;
}

export default function Welcome({ fastboatTickets, tourPackages }: Props) {
    const { auth } = usePage<SharedData>().props;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <>
            <Head title="🚤 Fastboat Tours - Island Adventures Await!">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-gray-900 dark:to-blue-900">
                {/* Header */}
                <header className="bg-white/95 backdrop-blur-sm shadow-sm dark:bg-gray-900/95">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🚤</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                    Fastboat Tours
                                </span>
                            </div>
                            <nav className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                                        >
                                            Admin Login
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            🏝️ Discover Paradise Islands
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                            Book your fastboat tickets and tour packages to explore the stunning beauty of 
                            Nusa Penida, Gili Islands, and Lombok. Adventure awaits! 🌊
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-lg">
                            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full">
                                <span>⚡</span>
                                <span>Fast & Safe Boats</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full">
                                <span>🎫</span>
                                <span>Instant E-Tickets</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/80 px-4 py-2 rounded-full">
                                <span>💳</span>
                                <span>Multiple Payment Options</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Fastboat Tickets Section */}
                <section className="py-16 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                🚤 Fastboat Tickets
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Choose from our daily scheduled fast boat services
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {fastboatTickets.map((ticket) => (
                                <div key={ticket.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow dark:bg-gray-800">
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {ticket.name}
                                            </h3>
                                            <span className="text-2xl font-bold text-blue-600">
                                                {formatCurrency(ticket.price)}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-300">
                                            <div className="flex items-center space-x-2">
                                                <span>📍</span>
                                                <span>{ticket.departure_location} → {ticket.arrival_location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span>⏰</span>
                                                <span>Departure: {ticket.departure_time}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span>👥</span>
                                                <span>Capacity: {ticket.capacity} passengers</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                                            {ticket.description}
                                        </p>

                                        <Link
                                            href={route('booking.create', { type: 'fastboat', id: ticket.id })}
                                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center block"
                                        >
                                            Book Now 🎫
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tour Packages Section */}
                <section className="py-16 px-4 bg-white/50 dark:bg-gray-800/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                🏝️ Tour Packages
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Complete tour experiences with guides, meals, and accommodation
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {tourPackages.map((tourPackage) => (
                                <div key={tourPackage.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow dark:bg-gray-800">
                                    <div className="h-48 bg-gradient-to-r from-blue-400 to-cyan-500 flex items-center justify-center">
                                        {tourPackage.image_path ? (
                                            <img 
                                                src={tourPackage.image_path} 
                                                alt={tourPackage.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-center text-white">
                                                <span className="text-4xl block mb-2">🏝️</span>
                                                <span className="text-lg font-medium">
                                                    {tourPackage.duration_days} Day{tourPackage.duration_days > 1 ? 's' : ''} Tour
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {tourPackage.name}
                                            </h3>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold text-green-600">
                                                    {formatCurrency(tourPackage.price)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {tourPackage.duration_days} day{tourPackage.duration_days > 1 ? 's' : ''}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm line-clamp-3">
                                            {tourPackage.description}
                                        </p>

                                        <Link
                                            href={route('booking.create', { type: 'tour', id: tourPackage.id })}
                                            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                                        >
                                            Book Tour 🗺️
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Why Choose Us? ⭐
                            </h2>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="text-4xl mb-4">⚡</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Fast & Reliable</h3>
                                <p className="text-gray-600 dark:text-gray-300">Modern fast boats with professional crews and safety equipment</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">💳</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Flexible Payment</h3>
                                <p className="text-gray-600 dark:text-gray-300">Credit card, bank transfer, or pay at our office</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">📱</div>
                                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Digital E-Tickets</h3>
                                <p className="text-gray-600 dark:text-gray-300">Instant PDF tickets with QR codes sent to your email</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-4xl mx-auto text-center px-4">
                        <div className="mb-6">
                            <span className="text-2xl mr-2">🚤</span>
                            <span className="text-xl font-bold">Fastboat Tours Indonesia</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            Your gateway to Indonesia's most beautiful islands. Safe, fast, and reliable transportation since 2020.
                        </p>
                        <div className="text-sm text-gray-500">
                            © 2024 Fastboat Tours Indonesia. All rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}