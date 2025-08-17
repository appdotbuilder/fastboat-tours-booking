<?php

namespace Database\Seeders;

use App\Models\FastboatTicket;
use Illuminate\Database\Seeder;

class FastboatTicketSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tickets = [
            [
                'name' => 'Sanur to Nusa Penida Express',
                'description' => 'Fast and comfortable journey from Sanur Beach to Nusa Penida. Enjoy scenic ocean views during your 45-minute trip.',
                'departure_location' => 'Sanur Beach',
                'arrival_location' => 'Nusa Penida',
                'departure_time' => '08:00:00',
                'price' => 75000,
                'capacity' => 50,
                'is_active' => true,
            ],
            [
                'name' => 'Sanur to Nusa Penida Morning',
                'description' => 'Early morning departure for those who want to maximize their day on Nusa Penida. Professional crew and safety equipment included.',
                'departure_location' => 'Sanur Beach',
                'arrival_location' => 'Nusa Penida',
                'departure_time' => '09:30:00',
                'price' => 75000,
                'capacity' => 50,
                'is_active' => true,
            ],
            [
                'name' => 'Sanur to Gili Trawangan',
                'description' => 'Direct route to the famous Gili Trawangan island. Perfect for backpackers and beach lovers seeking paradise.',
                'departure_location' => 'Sanur Beach',
                'arrival_location' => 'Gili Trawangan',
                'departure_time' => '10:00:00',
                'price' => 125000,
                'capacity' => 40,
                'is_active' => true,
            ],
            [
                'name' => 'Nusa Penida to Sanur Return',
                'description' => 'Return journey from Nusa Penida to Sanur. Comfortable seating and refreshments available onboard.',
                'departure_location' => 'Nusa Penida',
                'arrival_location' => 'Sanur Beach',
                'departure_time' => '15:30:00',
                'price' => 75000,
                'capacity' => 50,
                'is_active' => true,
            ],
            [
                'name' => 'Padang Bai to Lombok',
                'description' => 'Cross-island journey to Lombok. Experience the beauty of Indonesian archipelago with our modern fast boats.',
                'departure_location' => 'Padang Bai',
                'arrival_location' => 'Lombok',
                'departure_time' => '11:00:00',
                'price' => 150000,
                'capacity' => 60,
                'is_active' => true,
            ],
        ];

        foreach ($tickets as $ticket) {
            FastboatTicket::create($ticket);
        }
    }
}