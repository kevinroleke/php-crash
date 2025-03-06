<?php

namespace App\Http\Controllers;

use App\Models\Bet;
use Illuminate\Http\Request;
use App\Events\UpdateBet;

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

        broadcast(new UpdateBet($bet));

        return ['placed' => true];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $bet = Bet::with('game')->where('user_id', auth()->user()->id)->where('done', false)->firstOrFail();
        if ($bet->$game->end_time <= now() || $bet->$game->done) {
            return ['cashed' => false];
        }

        $msAfterStart = now()->diffWithCarbonInterval($bet->$game->bet_deadline)->total('milliseconds');
        $bet->multiplier = 100 + $msAfterStart/100;
        $bet->done = true;

        $bet->save();
        broadcast(new UpdateBet($bet));
    }
}
