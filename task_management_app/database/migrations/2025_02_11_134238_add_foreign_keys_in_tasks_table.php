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
        Schema::table('tasks', function (Blueprint $table) {
            $table->foreignId('category_id')->constrained();
            $table->foreignId('status_id')->constrained('status','id');
            $table->string('priority');
            $table->foreign('priority')->references('name')->on('priority');
            $table->foreignId('user_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropForeign(['status_id']);
            $table->dropForeign(['priority']);
            $table->dropForeign(['user_id']);
        });
    }
};
