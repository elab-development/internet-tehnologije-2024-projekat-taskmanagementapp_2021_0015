<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskListResource;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'description' => 'string|max:255'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task_list = TaskList::create([
            'name' => $request->name,
            'description' => $request->description,
            'user_id' => Auth::user()->id
        ]);

        return response()->json(['message'=>'Task list successfully created!', new TaskListResource($task_list)]);
    }

    public function update(Request $request, TaskList $task_list)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'description' => 'string|max:255'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task_list->name = $request->name;
        $task_list->description = $request->description;

        $task_list->save();

        return response()->json(['message'=>'Task list successfully updated!', new TaskListResource($task_list)]);
    }

    public function destroy(TaskList $task_list)
    {
        $task_list->delete();
        return response()->json(['message'=>'Task list has been deleted']);
    }
}
