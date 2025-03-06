<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

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
        $game = Game::where('done', false)->first();
        if ($game == null) {
            return;
        }

        $game->done = true;
        $game->save();
        foreach($game->bets()->where('done', false)->get() as $bet) {
            $bet->multiplier = 0;
            $bet->done = true;
            $bet->save();
        }
    }
}
