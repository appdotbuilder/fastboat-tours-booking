<?php

namespace Database\Factories;

use App\Models\FastboatTicket;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FastboatTicket>
 */
class FastboatTicketFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\FastboatTicket>
     */
    protected $model = FastboatTicket::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $locations = [
            'Sanur Beach', 'Nusa Penida', 'Gili Trawangan', 'Gili Air', 
            'Lombok', 'Padang Bai', 'Amed', 'Lembongan'
        ];

        $departureLocation = fake()->randomElement($locations);
        $arrivalLocation = fake()->randomElement(array_diff($locations, [$departureLocation]));

        return [
            'name' => $departureLocation . ' to ' . $arrivalLocation . ' Express',
            'description' => fake()->paragraph(3),
            'departure_location' => $departureLocation,
            'arrival_location' => $arrivalLocation,
            'departure_time' => fake()->time('H:i:s'),
            'price' => fake()->randomFloat(0, 50000, 200000),
            'capacity' => fake()->numberBetween(30, 80),
            'is_active' => true,
        ];
    }
}