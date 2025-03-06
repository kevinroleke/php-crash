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
            'end_time' => now().addSeconds(15).addMilliseconds(120*100),
            'bet_deadline' => now().addSeconds(15),
            'multiplier' => 220,
            'done' => false,
        ];
    }
}
