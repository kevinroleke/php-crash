<?php

namespace App\Http\Controllers;

use App\Models\Bet;
use Illuminate\Http\Request;
use App\Events\UpdateBet;
use App\Models\Game;
use Illuminate\Support\Facades\Log;

class BetController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $bet = Game::where('done', false)->where('bet_deadline', '>', now())->firstOrFail()->bets()->create([
            'user_id' => auth()->user()->id,
            'amount' => $request->amount,
            'multiplier' => 0,
            'done' => false,
        ]);

        broadcast(new UpdateBet($bet->load('user')));

        return ['placed' => true];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $bet = Bet::with('game')->where('user_id', auth()->user()->id)->where('done', false)->firstOrFail();
        if ($bet->game->end_time <= now() || $bet->game->done || $bet->game->bet_deadline > now()) {
            return ['cashed' => false];
        }

        $msAfterStart = $bet->game->bet_deadline->diffInMilliseconds(now());
        Log::info($msAfterStart);
        $bet->multiplier = 100 + $msAfterStart/100;
        $bet->done = true;

        $bet->save();
        broadcast(new UpdateBet($bet->load('user')));
        return ['cashed' => true];
    }
}
