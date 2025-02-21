<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public static $wrap = 'category';

    public function toArray(Request $request): array
    {
        
        return[
            'name'=>$this->resource->name,
            'tag'=>$this->resource->tag
        ];
    }
}
