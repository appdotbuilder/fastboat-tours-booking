<?php

namespace Database\Seeders;

use App\Models\TourPackage;
use Illuminate\Database\Seeder;

class TourPackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $packages = [
            [
                'name' => 'Nusa Penida Full Day Adventure',
                'description' => 'Explore the stunning landscapes of Nusa Penida including Kelingking Beach, Angel\'s Billabong, and Broken Beach. This full-day tour includes transportation, lunch, and professional guide.',
                'itinerary' => '• 07:00 - Pickup from hotel
• 08:00 - Fastboat to Nusa Penida
• 09:30 - Visit Kelingking Beach (T-Rex viewpoint)
• 11:00 - Angel\'s Billabong natural pool
• 12:30 - Lunch at local restaurant
• 14:00 - Broken Beach exploration
• 15:30 - Crystal Bay for swimming
• 17:00 - Return to Bali
• 18:30 - Drop off at hotel',
                'price' => 450000,
                'duration_days' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Gili Islands Hopping 2D1N',
                'description' => 'Discover the three beautiful Gili Islands - Trawangan, Meno, and Air. Perfect for snorkeling, diving, and enjoying pristine beaches. Includes accommodation and meals.',
                'itinerary' => 'Day 1:
• Morning pickup and fastboat transfer
• Check-in to beachfront accommodation
• Lunch at seaside restaurant
• Gili Trawangan exploration
• Sunset viewing
• Dinner and overnight stay

Day 2:
• Breakfast
• Island hopping to Gili Meno and Gili Air
• Snorkeling at best spots
• Lunch on the boat
• Return to Bali in afternoon',
                'price' => 850000,
                'duration_days' => 2,
                'is_active' => true,
            ],
            [
                'name' => 'Lombok Cultural Heritage Tour',
                'description' => 'Immerse yourself in Lombok\'s rich culture and traditions. Visit traditional Sasak villages, witness weaving demonstrations, and explore beautiful temples and markets.',
                'itinerary' => '• 08:00 - Fastboat to Lombok
• 10:00 - Visit Sukarara weaving village
• 11:30 - Traditional Sasak village of Sade
• 13:00 - Lunch with local family
• 14:30 - Lingsar Temple visit
• 16:00 - Ampenan traditional market
• 17:30 - Return journey to Bali',
                'price' => 550000,
                'duration_days' => 1,
                'is_active' => true,
            ],
            [
                'name' => 'Bali East Coast Explorer 3D2N',
                'description' => 'Comprehensive tour of Bali\'s eastern region including Amed, Tulamben, and Sidemen. Perfect for diving enthusiasts and nature lovers seeking authentic Bali experience.',
                'itinerary' => 'Day 1:
• Hotel pickup and drive to Amed
• Check-in to seaside resort
• Snorkeling at Japanese wreck site
• Traditional fishing village tour
• Sunset dinner

Day 2:
• Early morning diving at Tulamben
• Visit to Tirta Gangga water palace
• Sidemen rice terrace exploration
• Traditional weaving workshop
• Overnight in mountain retreat

Day 3:
• Sunrise yoga session
• Breakfast with valley view
• Visit local markets
• Return to Bali main areas',
                'price' => 1200000,
                'duration_days' => 3,
                'is_active' => true,
            ],
            [
                'name' => 'Ultimate Island Paradise 4D3N',
                'description' => 'The most comprehensive island-hopping experience combining Nusa Penida, Gili Islands, and Lombok. Luxury accommodation, private guides, and exclusive access to hidden gems.',
                'itinerary' => 'Day 1: Nusa Penida East & West Tour
Day 2: Gili Trawangan water sports & nightlife
Day 3: Gili Meno relaxation & Gili Air exploration
Day 4: Lombok cultural sites & return to Bali

Includes:
• Luxury beachfront accommodations
• Private fast boat transfers
• Professional photographer
• All meals and activities
• Spa treatments included',
                'price' => 2500000,
                'duration_days' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($packages as $package) {
            TourPackage::create($package);
        }
    }
}