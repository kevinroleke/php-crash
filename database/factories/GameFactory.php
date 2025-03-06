<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'start_time' => now(),
            'end_time' => now() + 10 + 1.2,
            'bet_deadline' => now() + 10,
            'multiplier' => 220,
            'done' => false,
        ];
    }
}
