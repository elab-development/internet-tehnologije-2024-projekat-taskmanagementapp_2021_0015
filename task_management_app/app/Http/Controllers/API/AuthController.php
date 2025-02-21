<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $validator = Validator::make($request->all(),[
            'first_name'=>'required|string|regex:/[A-Z][a-z]+/|max:255',
            'last_name'=>'required|string|regex:/[A-Z][a-z]+/|max:255',
            'username'=>'required|string|max:255|unique:users',
            'password'=>'required|string|min:10'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());
        }

        $user = User::create([
            'first_name'=>$request->first_name,
            'last_name'=>$request->last_name,
            'username'=>$request->username,
            'password'=>Hash::make($request->password)
        ]);
        
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message'=>'Registration successful!', 
                                 'user'=>$user, 
                                 'access_token'=>$token, 
                                 'token_type'=>'Bearer']);
    }

    public function login(Request $request){
        if(!Auth::attempt($request->only('username','password'))){
            return response()->json(
                ['message' => 'Couldn\'t log in with given username and password']
            );
        }

        $user = User::where('username', $request['username'])->first();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['message'=>'Successfully logged in!', 
                                 'access_token'=>$token, 
                                 'token_type'=>'Bearer']);
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json(['message'=>'You have logged out!']);
    }
}
