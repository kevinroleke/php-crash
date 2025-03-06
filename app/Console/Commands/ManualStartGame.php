<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Jobs\StartGame;

class ManualStartGame extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:manual-start-game';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start the first game';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        StartGame::dispatch();
    }
}
