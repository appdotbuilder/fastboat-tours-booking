<?php

namespace Database\Factories;

use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TourPackage>
 */
class TourPackageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\TourPackage>
     */
    protected $model = TourPackage::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $destinations = [
            'Nusa Penida', 'Gili Islands', 'Lombok', 'Komodo', 'East Bali'
        ];

        $duration = fake()->numberBetween(1, 5);
        $destination = fake()->randomElement($destinations);

        return [
            'name' => $destination . ' Adventure ' . $duration . 'D' . ($duration > 1 ? ($duration - 1) . 'N' : ''),
            'description' => fake()->paragraphs(3, true),
            'itinerary' => fake()->paragraphs(5, true),
            'price' => fake()->randomFloat(0, 300000, 2000000),
            'duration_days' => $duration,
            'is_active' => true,
        ];
    }
}