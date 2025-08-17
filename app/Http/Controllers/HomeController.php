<?php

namespace App\Http\Controllers;

use App\Models\FastboatTicket;
use App\Models\TourPackage;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Display the home page with fastboat tickets and tour packages.
     */
    public function index()
    {
        $fastboatTickets = FastboatTicket::active()
            ->orderBy('departure_time')
            ->get();

        $tourPackages = TourPackage::active()
            ->orderBy('name')
            ->get();

        return Inertia::render('welcome', [
            'fastboatTickets' => $fastboatTickets,
            'tourPackages' => $tourPackages,
        ]);
    }
}