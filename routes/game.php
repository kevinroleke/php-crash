<?php

use App\Http\Controllers\GameController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('game', [GameController::class, 'index'])->name('game');
