<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bet', function (Blueprint $table) {
            $table->id();
            $table->index('user_id');
            $table->index('game_id');
            $table->integer('user_id');
            $table->integer('game_id');
            $table->integer('amount');
            $table->integer('multiplier');
            $table->boolean('done');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('game_id')->references('id')->on('game');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bet');
    }
};
