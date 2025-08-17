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
        Schema::create('fastboat_tickets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->string('departure_location');
            $table->string('arrival_location');
            $table->time('departure_time');
            $table->decimal('price', 10, 2);
            $table->integer('capacity');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Indexes for performance
            $table->index('is_active');
            $table->index(['departure_location', 'arrival_location']);
            $table->index('departure_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fastboat_tickets');
    }
};