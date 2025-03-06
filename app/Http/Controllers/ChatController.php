<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use Illuminate\Http\Request;
use App\Events\ChatMessage;

class ChatController extends Controller
{
    public function __construct()
    {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Chat::with('user')->orderByDesc('done')->limit(1)->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $chat = auth()->user()->chats()->create([
            'message' => $request->message,
        ]);

        broadcast(new ChatMessage($chat->load('user')));

        return ['success' => true];
    }
}
