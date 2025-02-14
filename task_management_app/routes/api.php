<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\UserController;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Models\Priority;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//prikazivanje korisnika
Route::get('users', [UserController::class,'index']);
Route::get('users/{id}', [UserController::class,'show']);

//prikaz dostupnih kategorija
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

//prikaz dostupnih statusa
Route::get('statuses', function(){
    $statuses = Status::all();
    return response()->json($statuses);
});

//prikaz dostupnih prioriteta
Route::get('priorities', function(){
    $priorities = Priority::all();
    return response()->json($priorities);
});


Route::post('register',[AuthController::class,'register']);
Route::post('login',[AuthController::class,'login']);

Route::group(['middleware'=> ['auth:sanctum']], function(){
    //rute za azuriranje i brisanje korisnika
    Route::put('users/{id}',[UserController::class,'update']);
    Route::delete('users/{id}',[UserController::class,'destroy']);

    //rute za rad za zadacima
    Route::resource('tasks',TaskController::class)->only(['index','show','store','update','destroy']);

    //rute za rad sa listama zadataka
    Route::get('task_lists',[TaskListController::class,'index']);
    Route::get('task_lists/{id}',[TaskListController::class,'show']);
    Route::post('task_lists',[TaskListController::class,'store']);
    Route::put('task_lists/{id}',[TaskListController::class,'update']);
    Route::delete('task_lists/{id}',[TaskListController::class,'destroy']);

    //logout
    Route::post('logout', [AuthController::class,'logout']);
});
