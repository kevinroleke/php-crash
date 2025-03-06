<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Game;

class StopGame implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $game = Game::with('bets')->where('done', false)->first();
        if ($game == null) {
            return;
        }

        $game->done = true;
        $game->save();
        foreach($game->bets as $bet) {
            if (!$bet->done) {
                $bet->multiplier = 0;
                $bet->done = true;
                $bet->save();
            }
        }

        StartGame::dispatch()->delay(now()->addSeconds(5));
    }
}
