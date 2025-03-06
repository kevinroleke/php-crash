<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bet extends Model
{
    /** @use HasFactory<\Database\Factories\BetFactory> */
    use HasFactory;
    protected $table = 'bet';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'game_id',
        'amount',
        'multiplier',
        'done',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
