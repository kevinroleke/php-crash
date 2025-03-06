<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Game;

class StartGame implements ShouldQueue
{
    use Dispatchable, Queueable, SerializesModels, InteractsWithQueue;

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
        if (Game::where('done', false)->count()) {
            // active game already
            return;
        }

        $n = rand(0, 4503599627370495);
        $n /= 2**52;
        $n = min(max(floor(99 / (1 - $n)), 100), 5000);

        $game = new Game;
        $game->start_time = now();
        $game->bet_deadline = now()->addSeconds(15);
        $game->done = false;
        $game->multiplier = $n;
        $game->end_time = now()->addSeconds(15)->addMilliseconds(($n-100)*100);
        $game->save();

        StopGame::dispatch()->delay(now()->addSeconds(15)->addMilliseconds(($n-100)*100));
    }
}
