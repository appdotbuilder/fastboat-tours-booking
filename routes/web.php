<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\FastboatTicketController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Public routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/booking/create', [BookingController::class, 'create'])->name('booking.create');
Route::post('/booking', [BookingController::class, 'store'])->name('booking.store');
Route::get('/booking/{booking}', [BookingController::class, 'show'])->name('booking.show');
Route::get('/payment/{bookingNumber}', [PaymentController::class, 'show'])->name('payment.show');
Route::post('/payment/{bookingNumber}', [PaymentController::class, 'store'])->name('payment.store');

// Admin routes (protected)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Admin routes with prefix
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::resource('fastboat-tickets', FastboatTicketController::class);
        // TODO: Add tour package and booking management routes
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
