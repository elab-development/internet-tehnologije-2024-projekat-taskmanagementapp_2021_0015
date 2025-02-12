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
            $table->foreignId('category_id')->constrained('categories','id');
            $table->string('status');
            $table->foreign('status')->references('name')->on('statuses');
            $table->string('priority');
            $table->foreign('priority')->references('name')->on('priorities');
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
            $table->dropForeign(['status']);
            $table->dropForeign(['priority']);
            $table->dropForeign(['user_id']);
        });
    }
};
