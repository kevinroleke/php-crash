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
        Schema::create('game', function (Blueprint $table) {
            $table->id();
            $table->timestamp('start_time');
            $table->timestamp('bet_deadline');
            $table->timestamp('end_time');
            $table->integer('multiplier');
            $table->boolean('done');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game');
    }
};
