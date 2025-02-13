<?php

use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\UserController;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('users', [UserController::class,'index']);
Route::get('users/{id}', [UserController::class,'show']);
Route::post('users',[UserController::class,'store']);
Route::put('users/{id}',[UserController::class,'update']);
Route::delete('users/{id}',[UserController::class,'destroy']);

Route::resource('tasks',TaskController::class)->only(['index','show']);

Route::get('task_lists',[TaskListController::class,'index']);
Route::get('task_lists/{id}',[TaskListController::class,'show']);

Route::get('categories', function(){
    $categories = Category::all();
    return CategoryResource::collection($categories);
});
Route::get('categories/{id}', function(string $id){
    $category = Category::find($id);
    if(is_null($category)){
        return response()->json('Category not found',404);
    }
    return new CategoryResource($category);
})->whereNumber('id');

Route::get('statuses', function(){
    $statuses = Status::all();
    return response()->json($statuses);
});

Route::get('priorities', function(){
    $priorities = Priority::all();
    return response()->json($priorities);
});
