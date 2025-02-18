<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ListOrder
{
    protected $fillable = ['task_list_id','task_id','num'];
}
