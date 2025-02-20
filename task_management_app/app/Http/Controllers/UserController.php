<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($user_id)
    {
        $user = User::find($user_id);
        if(is_null($user)){
            return response()->json('User doesn\'t exist');
        }
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $current_user = Auth::user();
        $user_id = $current_user->id;
        $user = User::find($user_id);

        $validate = Validator::make($request->all(),[
            'first_name'=>'required|regex:/[A-Z][a-z]+/|max:255',
            'last_name'=>'required|regex:/[A-Z][a-z]+/|max:255',
            'username'=>'required|string|max:255|unique:users'
        ]);

        if($validate->fails()){
            return response()->json($validate->errors());
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->username = $request->username;

        $user->save();

        return response()->json(['message'=>'User updated successfully!', new UserResource($user)]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User has been deleted']);
    }
}
