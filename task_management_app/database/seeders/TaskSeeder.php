<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::factory()->create([
            'status'=>Status::all()->random()->name,
            'priority'=>Priority::all()->random()->name,
            'user_id'=>User::all()->random()->id
        ]);
        Task::factory()->create([
            'status'=>Status::all()->random()->name,
            'priority'=>Priority::all()->random()->name,
            'user_id'=>User::all()->random()->id
        ]);
        Task::factory()->create([
            'status'=>Status::all()->random()->name,
            'priority'=>Priority::all()->random()->name,
            'user_id'=>User::all()->random()->id
        ]);
        Task::factory()->create([
            'status'=>Status::all()->random()->name,
            'priority'=>Priority::all()->random()->name,
            'user_id'=>User::all()->random()->id
        ]);
        Task::factory()->create([
            'status'=>Status::all()->random()->name,
            'priority'=>Priority::all()->random()->name,
            'user_id'=>User::all()->random()->id
        ]);
    }
}
