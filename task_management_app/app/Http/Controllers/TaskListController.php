<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskListResource;
use App\Models\TaskList;
use Illuminate\Http\Request;

class TaskListController extends Controller
{
    public function index()
    {
        $task_lists = TaskList::all();
        return TaskListResource::collection($task_lists);
    }

    public function show($task_list_id)
    {
        $task_list = TaskList::find($task_list_id);
        if(is_null($task_list)){
            return response()->json('List not found',404);
        }
        return new TaskListResource($task_list);
    }
}
