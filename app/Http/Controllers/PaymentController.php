<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Show the payment page.
     */
    public function show(string $bookingNumber)
    {
        $booking = Booking::with('bookable')
            ->where('booking_number', $bookingNumber)
            ->firstOrFail();

        // If already paid, redirect to booking details
        if ($booking->payment_status === 'paid') {
            return redirect()->route('booking.show', $booking);
        }

        return Inertia::render('payment/show', [
            'booking' => $booking,
            'bankDetails' => $this->getBankDetails(),
        ]);
    }

    /**
     * Process payment confirmation.
     */
    public function store(string $bookingNumber)
    {
        $booking = Booking::where('booking_number', $bookingNumber)
            ->where('payment_status', 'pending')
            ->firstOrFail();

        $paymentMethod = request('payment_method', $booking->payment_method);

        if ($paymentMethod === 'pay_at_office') {
            // Keep as pending for pay at office
            return redirect()->route('booking.show', $booking)
                ->with('success', 'Booking confirmed! Please visit our office for payment.');
        } elseif ($paymentMethod === 'bank_transfer') {
            // Mark as paid for bank transfer (in real app, would verify payment)
            $booking->update([
                'payment_status' => 'paid',
                'paid_at' => now(),
                'payment_reference' => request('payment_reference', 'BANK_TRANSFER_' . $booking->booking_number),
            ]);

            // TODO: Generate and send e-ticket
            
            return redirect()->route('booking.show', $booking)
                ->with('success', 'Payment confirmed! Your e-ticket will be sent to your email.');
        } elseif ($paymentMethod === 'credit_card') {
            // TODO: Integrate with payment gateway (Stripe/Midtrans)
            // For now, mark as paid
            $booking->update([
                'payment_status' => 'paid',
                'paid_at' => now(),
                'payment_reference' => 'CARD_' . $booking->booking_number,
            ]);

            return redirect()->route('booking.show', $booking)
                ->with('success', 'Payment successful! Your e-ticket will be sent to your email.');
        }

        return back()->withErrors(['payment' => 'Invalid payment method.']);
    }

    /**
     * Get bank account details for manual transfer.
     */
    protected function getBankDetails(): array
    {
        return [
            'bank_name' => 'Bank Central Asia (BCA)',
            'account_number' => '1234567890',
            'account_name' => 'Fastboat Tours Indonesia',
            'branch' => 'Denpasar Main Branch',
        ];
    }
}