<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Deposit;

class ManualDeposit extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:manual-deposit {user_id : The ID of the user} {amount : The amount to deposit}';


    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Make a deposit';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $userId = $this->argument('user_id');
        $amount = $this->argument('amount');

        if (!is_numeric($userId) || $userId <= 0) {
            $this->error('Invalid user ID');
            return 1;
        }

        if (!is_numeric($amount) || $amount <= 0) {
            $this->error('Invalid amount');
            return 1;
        }


        $deposit = new Deposit();
        $deposit->user_id = $userId;
        $deposit->amount = $amount;
        $deposit->save();
    }
}
