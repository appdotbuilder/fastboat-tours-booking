<?php

namespace Database\Factories;

use App\Models\Booking;
use App\Models\FastboatTicket;
use App\Models\TourPackage;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Booking>
 */
class BookingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Booking>
     */
    protected $model = Booking::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Randomly choose between FastboatTicket and TourPackage
        $bookableType = fake()->randomElement([FastboatTicket::class, TourPackage::class]);
        $bookable = $bookableType::factory()->create();
        
        $quantity = fake()->numberBetween(1, 5);
        $totalAmount = $bookable->price * $quantity;

        return [
            'booking_number' => Booking::generateBookingNumber(),
            'customer_name' => fake()->name(),
            'customer_email' => fake()->safeEmail(),
            'customer_phone' => fake()->phoneNumber(),
            'quantity' => $quantity,
            'booking_date' => fake()->dateTimeBetween('now', '+3 months')->format('Y-m-d'),
            'bookable_type' => $bookableType,
            'bookable_id' => $bookable->id,
            'total_amount' => $totalAmount,
            'payment_method' => fake()->randomElement(['credit_card', 'bank_transfer', 'pay_at_office']),
            'payment_status' => fake()->randomElement(['paid', 'pending']),
        ];
    }

    /**
     * Indicate that the booking is paid.
     */
    public function paid(): static
    {
        return $this->state(fn (array $attributes) => [
            'payment_status' => 'paid',
            'paid_at' => fake()->dateTimeBetween('-1 month', 'now'),
            'payment_reference' => 'PAY_' . fake()->uuid(),
        ]);
    }
}