<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FastboatTicket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FastboatTicketController extends Controller
{
    /**
     * Display a listing of fastboat tickets.
     */
    public function index()
    {
        $tickets = FastboatTicket::withCount('bookings')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/fastboat-tickets/index', [
            'tickets' => $tickets,
        ]);
    }

    /**
     * Show the form for creating a new fastboat ticket.
     */
    public function create()
    {
        return Inertia::render('admin/fastboat-tickets/create');
    }

    /**
     * Store a newly created fastboat ticket.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'departure_location' => 'required|string|max:255',
            'arrival_location' => 'required|string|max:255',
            'departure_time' => 'required|date_format:H:i',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        FastboatTicket::create($validated);

        return redirect()->route('admin.fastboat-tickets.index')
            ->with('success', 'Fastboat ticket created successfully.');
    }

    /**
     * Display the specified fastboat ticket.
     */
    public function show(FastboatTicket $fastboatTicket)
    {
        $fastboatTicket->load('bookings.bookable');

        return Inertia::render('admin/fastboat-tickets/show', [
            'ticket' => $fastboatTicket,
        ]);
    }

    /**
     * Show the form for editing the specified fastboat ticket.
     */
    public function edit(FastboatTicket $fastboatTicket)
    {
        return Inertia::render('admin/fastboat-tickets/edit', [
            'ticket' => $fastboatTicket,
        ]);
    }

    /**
     * Update the specified fastboat ticket.
     */
    public function update(Request $request, FastboatTicket $fastboatTicket)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'departure_location' => 'required|string|max:255',
            'arrival_location' => 'required|string|max:255',
            'departure_time' => 'required|date_format:H:i',
            'price' => 'required|numeric|min:0',
            'capacity' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $fastboatTicket->update($validated);

        return redirect()->route('admin.fastboat-tickets.show', $fastboatTicket)
            ->with('success', 'Fastboat ticket updated successfully.');
    }

    /**
     * Remove the specified fastboat ticket.
     */
    public function destroy(FastboatTicket $fastboatTicket)
    {
        $fastboatTicket->delete();

        return redirect()->route('admin.fastboat-tickets.index')
            ->with('success', 'Fastboat ticket deleted successfully.');
    }
}