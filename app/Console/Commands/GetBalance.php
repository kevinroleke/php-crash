<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;

class GetBalance extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:get-balance {user_id : The ID of the user }';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get user balance';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userId = $this->argument('user_id');

        if (!is_numeric($userId) || $userId <= 0) {
            $this->error('Invalid user ID');
            return 1;
        }

        echo User::find($userId)->balance;
    }
}
