<?php

namespace App\Http\Controllers;

use App\Http\Resources\ListOrderResource;
use App\Http\Resources\TaskListResource;
use App\Models\TaskList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ListOrderController extends Controller
{
    public function index(){

        $user = Auth::user();
        $lists = TaskList::where('user_id',$user->id)->with('task')->get();
        return ListOrderResource::collection($lists);
        
    }
}
