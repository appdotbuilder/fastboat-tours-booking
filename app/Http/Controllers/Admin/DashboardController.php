<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\FastboatTicket;
use App\Models\TourPackage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index()
    {
        $stats = [
            'total_fastboat_bookings' => Booking::whereHasMorph('bookable', [FastboatTicket::class])->count(),
            'total_tour_bookings' => Booking::whereHasMorph('bookable', [TourPackage::class])->count(),
            'total_revenue' => Booking::paid()->sum('total_amount'),
            'pending_bookings' => Booking::pending()->count(),
            'fastboat_tickets_count' => FastboatTicket::active()->count(),
            'tour_packages_count' => TourPackage::active()->count(),
        ];

        $recentBookings = Booking::with('bookable')
            ->latest()
            ->limit(10)
            ->get();

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'recentBookings' => $recentBookings,
        ]);
    }
}