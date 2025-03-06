<?php

use App\Http\Controllers\BetController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::post('bet', [BetController::class, 'update'])->name('bet');
    Route::put('bet', [BetController::class, 'store'])->name('bet');
});
