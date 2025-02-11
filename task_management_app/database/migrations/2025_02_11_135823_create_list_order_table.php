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
        Schema::create('list_order', function (Blueprint $table) {
            $table->foreignId('task_list_id')->constrained('task_list','id');
            $table->foreignId('task_id')->constrained();
            $table->integer('num');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('list_order');
    }
};
