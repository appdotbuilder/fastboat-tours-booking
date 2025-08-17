<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * App\Models\FastboatTicket
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $departure_location
 * @property string $arrival_location
 * @property string $departure_time
 * @property float $price
 * @property int $capacity
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Booking[] $bookings
 * @property-read int|null $bookings_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|FastboatTicket newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FastboatTicket newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FastboatTicket query()
 * @method static \Illuminate\Database\Eloquent\Builder|FastboatTicket active()
 * @method static \Database\Factories\FastboatTicketFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class FastboatTicket extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'departure_location',
        'arrival_location',
        'departure_time',
        'price',
        'capacity',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'capacity' => 'integer',
        'is_active' => 'boolean',
        'departure_time' => 'datetime:H:i',
    ];

    /**
     * Get all bookings for this fastboat ticket.
     */
    public function bookings(): MorphMany
    {
        return $this->morphMany(Booking::class, 'bookable');
    }

    /**
     * Scope a query to only include active fastboat tickets.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}