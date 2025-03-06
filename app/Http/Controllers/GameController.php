<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $game = Game::select('start_time', 'bet_deadline', 'done')->where('done', false)->first();
        if ($game == null) {
            return Game::where('done', true)->orderByDesc('end_time')->limit(1)->first();
        }
        return $game;
    }
}
