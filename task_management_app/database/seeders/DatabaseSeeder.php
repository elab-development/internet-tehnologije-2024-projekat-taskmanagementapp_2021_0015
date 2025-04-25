<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use App\Models\Task;
use App\Models\TaskList;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        Schema::disableForeignKeyConstraints();
        Category::truncate();
        Task::truncate();
        Schema::enableForeignKeyConstraints();


        Priority::create([
            'name'=>'low'
        ]);
        Priority::create([
            'name'=>'medium'
        ]);
        Priority::create([
            'name'=>'high'
        ]);        
        
        Status::create([
            'name'=>'Not started',
            'desc'=>fake()->sentence()
        ]);
        Status::create([
            'name'=>'Active',
            'desc'=>fake()->sentence()
        ]);
        Status::create([
            'name'=>'Finished',
            'desc'=>fake()->sentence()
        ]);


        User::factory(3)->create();
        $this->call(TaskSeeder::class);
        $this->call(TaskListSeeder::class);

    }
}
