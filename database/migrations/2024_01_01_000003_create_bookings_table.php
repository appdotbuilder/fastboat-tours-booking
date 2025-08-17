<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('booking_number')->unique();
            $table->string('customer_name');
            $table->string('customer_email');
            $table->string('customer_phone');
            $table->integer('quantity');
            $table->date('booking_date');
            $table->morphs('bookable'); // For polymorphic relationship
            $table->decimal('total_amount', 10, 2);
            $table->enum('payment_method', ['credit_card', 'bank_transfer', 'pay_at_office']);
            $table->enum('payment_status', ['pending', 'paid', 'cancelled'])->default('pending');
            $table->string('payment_reference')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->string('eticket_path')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('booking_number');
            $table->index('customer_email');
            $table->index('payment_status');
            $table->index('booking_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};