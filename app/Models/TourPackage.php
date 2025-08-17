<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * App\Models\TourPackage
 *
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $itinerary
 * @property float $price
 * @property string|null $image_path
 * @property int $duration_days
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Booking[] $bookings
 * @property-read int|null $bookings_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|TourPackage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TourPackage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TourPackage query()
 * @method static \Illuminate\Database\Eloquent\Builder|TourPackage active()
 * @method static \Database\Factories\TourPackageFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class TourPackage extends Model
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
        'itinerary',
        'price',
        'image_path',
        'duration_days',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'duration_days' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Get all bookings for this tour package.
     */
    public function bookings(): MorphMany
    {
        return $this->morphMany(Booking::class, 'bookable');
    }

    /**
     * Scope a query to only include active tour packages.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}