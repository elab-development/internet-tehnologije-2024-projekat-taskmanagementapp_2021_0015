<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json($users);
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
        
    }

    /**
     * Display the specified resource.
     */
    public function show($user_id)
    {
        $user = User::find($user_id);
        if(is_null($user)){
            return response()->json('User doesn\'t exist');
        }
        return response()->json($user);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $current_user = Auth::user();
        $user_id = $current_user->id;
        $user = User::find($user_id);

        $validate = Validator::make($request->all(),[
            'first_name'=>'required|regex:/[A-Z][a-z]+/|max:255',
            'last_name'=>'required|regex:/[A-Z][a-z]+/|max:255',
            'username'=>'required|string|max:255|unique:users',
            'password'=>'required|string|min:10'
        ]);

        if($validate->fails()){
            return response()->json($validate->errors());
        }

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->username = $request->username;
        $user->password = Hash::make($request->first_name);

        $user->save();

        return response()->json(['message'=>'User updated successfully!', new UserResource($user)]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'User has been deleted']);
    }
}
