<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->title(),
            'description'=>fake()->sentence(),
            'due_date'=>fake()->date(),
            'category_id'=>Category::factory(),
            'status_id'=>Status::factory(),
            'priority_id'=>Priority::factory(),
            'user_id'=>User::factory(),
        ];
    }
}
