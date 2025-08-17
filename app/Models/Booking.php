<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * App\Models\Booking
 *
 * @property int $id
 * @property string $booking_number
 * @property string $customer_name
 * @property string $customer_email
 * @property string $customer_phone
 * @property int $quantity
 * @property string $booking_date
 * @property string $bookable_type
 * @property int $bookable_id
 * @property float $total_amount
 * @property string $payment_method
 * @property string $payment_status
 * @property string|null $payment_reference
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property string|null $eticket_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $bookable
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking query()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking paid()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking pending()
 * @method static \Database\Factories\BookingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'booking_number',
        'customer_name',
        'customer_email',
        'customer_phone',
        'quantity',
        'booking_date',
        'bookable_type',
        'bookable_id',
        'total_amount',
        'payment_method',
        'payment_status',
        'payment_reference',
        'paid_at',
        'eticket_path',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'quantity' => 'integer',
        'booking_date' => 'date',
        'total_amount' => 'decimal:2',
        'paid_at' => 'datetime',
    ];

    /**
     * Get the bookable model (FastboatTicket or TourPackage).
     */
    public function bookable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * Scope a query to only include paid bookings.
     */
    public function scopePaid($query)
    {
        return $query->where('payment_status', 'paid');
    }

    /**
     * Scope a query to only include pending bookings.
     */
    public function scopePending($query)
    {
        return $query->where('payment_status', 'pending');
    }

    /**
     * Generate a unique booking number.
     */
    public static function generateBookingNumber(): string
    {
        do {
            $bookingNumber = 'BK' . date('Ymd') . str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (self::where('booking_number', $bookingNumber)->exists());

        return $bookingNumber;
    }
}