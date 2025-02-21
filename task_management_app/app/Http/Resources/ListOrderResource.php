<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static $wrap = 'task list';
    
    public function toArray(Request $request): array
    {
        return [
            'task_list_id' => $this->id,
            'tasks' => $this->tasks->map(function($task){
                return [
                    'rb' => $task->pivot->num,
                    'task' => new TaskResource($task)
                ];
            })
        ];
    }
}
