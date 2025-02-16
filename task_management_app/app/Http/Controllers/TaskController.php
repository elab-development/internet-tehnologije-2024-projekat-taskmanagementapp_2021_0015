<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::paginate(10);
        return TaskResource::collection($tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'due_date' => 'date|after:today',
            'category_id' => 'required',
            'status' => ['required',Rule::in(['Not started','Active','Finished'])],
            'priority' => ['required',Rule::in(['low','medium','high'])]
        ]);

        //Rule::date()->format('Y-m-d')
        //Rule::in(['Not started','Active','Finished'])
        //Rule::in(['low','medium','high']

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task = Task::create([
            'name' => $request->name,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'category_id' => $request->category_id,
            'status' => $request->status,
            'priority' => $request->priority,
            'user_id' => Auth::user()->id
        ]);

        return response()->json(['message'=>'Task successfully created!', new TaskResource($task)]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    public function filter(Request $request){

        $validator = Validator::make($request->all(),[
            'status' => Rule::in(['Not started','Active','Finished']),
            'priority' => Rule::in(['low','medium','high']),
            'category_id' => 'exists:categories,id'
        ]);

        if($validator->fails()){
            return response()->json($validator()->errors());
        }

        $query = Task::query();

        if($request->has('status')){
            $query->where('status',$request->status);
        }

        if($request->has('priority')){
            $query->where('priority',$request->priority);
        }

        if($request->has('category_id')){
            $query->where('category_id',$request->category_id);
        }

        $tasks = $query->get();
        return TaskResource::collection($tasks);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'description' => 'string|max:255',
            'due_date' => 'date|after:today',
            'category_id' => 'required',
            'status' => ['required',Rule::in(['Not started','Active','Finished'])],
            'priority' => ['required',Rule::in(['low','medium','high'])],
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $task->name = $request->name;
        $task->description = $request->description;
        $task->due_date = $request->due_date;
        $task->category_id = $request->category_id;
        $task->status = $request->status;
        $task->priority = $request->priority;

        $task->save();

        return response()->json(['message'=>'Task successfully updated!', new TaskResource($task)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->json(['message'=>'Task has been deleted']);
    }

    
}
