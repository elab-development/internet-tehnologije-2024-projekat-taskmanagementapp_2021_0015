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
        $user_id = Auth::id();
        $task_lists = TaskList::where('user_id',$user_id)->get();
        return TaskListResource::collection($task_lists);
    }

    public function show($task_list_id)
    {
        $task_list = TaskList::find($task_list_id);
        if(!$task_list || ($task_list->user_id !== Auth::id())){
            return response()->json(['message'=>'Task list not found']);
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

    public function update(Request $request, $task_list_id)
    {
        $task_list = TaskList::find($task_list_id);

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

    public function destroy($task_list_id)
    {
        $task_list = TaskList::find($task_list_id);
        if(!$task_list || Auth::id()!==$task_list->user_id){
            return response()->json(['message'=>'Error']);
        }
        $task_list->delete();
        return response()->json(['message'=>'Task list has been deleted']);
    }
}
