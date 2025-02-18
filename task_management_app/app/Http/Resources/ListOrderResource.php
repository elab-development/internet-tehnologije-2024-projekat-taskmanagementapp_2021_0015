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
    public function toArray(Request $request): array
    {
        return [
            'task_list_id' => $this->resource->id,
            'task_id' => TaskResource::collection($this->task),
            'num' => $this->resource->num
        ];
    }
}
