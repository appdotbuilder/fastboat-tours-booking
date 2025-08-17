<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\FastboatTicket;
use App\Models\TourPackage;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Show the booking form.
     */
    public function create()
    {
        $bookableType = request('type');
        $bookableId = request('id');

        $bookable = null;
        if ($bookableType === 'fastboat' && $bookableId) {
            $bookable = FastboatTicket::active()->find($bookableId);
        } elseif ($bookableType === 'tour' && $bookableId) {
            $bookable = TourPackage::active()->find($bookableId);
        }

        if (!$bookable) {
            return redirect()->route('home')->with('error', 'Invalid booking item selected.');
        }

        return Inertia::render('booking/create', [
            'bookable' => $bookable,
            'bookableType' => $bookableType,
        ]);
    }

    /**
     * Store a new booking.
     */
    public function store(StoreBookingRequest $request)
    {
        $validated = $request->validated();

        // Get the bookable item
        $bookableModel = $validated['bookable_type'];
        $bookable = $bookableModel::find($validated['bookable_id']);

        if (!$bookable || !$bookable->is_active) {
            return back()->withErrors(['bookable_id' => 'Selected item is not available.']);
        }

        // Calculate total amount
        $totalAmount = $bookable->price * $validated['quantity'];

        // Create booking
        $booking = Booking::create([
            'booking_number' => Booking::generateBookingNumber(),
            'customer_name' => $validated['customer_name'],
            'customer_email' => $validated['customer_email'],
            'customer_phone' => $validated['customer_phone'],
            'quantity' => $validated['quantity'],
            'booking_date' => $validated['booking_date'],
            'bookable_type' => $validated['bookable_type'],
            'bookable_id' => $validated['bookable_id'],
            'total_amount' => $totalAmount,
            'payment_method' => $validated['payment_method'],
            'payment_status' => $validated['payment_method'] === 'pay_at_office' ? 'pending' : 'pending',
        ]);

        // Redirect to payment page
        return redirect()->route('payment.show', $booking->booking_number);
    }

    /**
     * Show booking details.
     */
    public function show(Booking $booking)
    {
        $booking->load('bookable');

        return Inertia::render('booking/show', [
            'booking' => $booking,
        ]);
    }
}