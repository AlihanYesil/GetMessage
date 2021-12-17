<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\personel_token;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use SebastianBergmann\Environment\Console;

class ApiController extends Controller
{
    //


    public function login(Request $request) {

        if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){

            $user= Auth::user();

            $tokenable_id=DB::table('personal_access_tokens')
            ->join('users','personal_access_tokens.tokenable_id','=',"users.id")
            ->select([
                'personal_access_tokens.tokenable_id',
                'personal_access_tokens.token',
                'users.email',
                'users.id'
            ])->where('personal_access_tokens.tokenable_id',Auth::id())->first();

            $token['token']=$user->createToken('kayıt')->accessToken;


            return response()->json([
                'success' => $tokenable_id,
                'message' => 'welcome'
            ],$status=200);
        }
        else{
            return response()->json([
                'error' => 'Unauthorized',
            ],$status=401);
        }
    }


    public function register(Request $request){

             $veri=user::firstOrCreate([
            'email'     =>  $request->email,
        ],
        [
            'name'          =>  $request->name,
            'surname'       =>  $request->surname,
            'email'         =>  $request->email,
            'password'      => Hash::make($request->password)
        ]);
            $veri->save();
            if($veri->wasRecentlyCreated){
                return response([
                    'message' => 'Kayıt daha önce oluşturulmamış - işlem basarili'
                ],$status=200);


            }
            else{
                return response([
                    'message' => 'Böyle bir kayıt zaten var - işlem basarisiz'
                ],$status=401)  ;
            }

        }



    public function logout(){

    }


    public function data(){
        $data = DB::table('users')->get()->all();

        return response()->json([
            'data'=>$data
        ]);
    }

}
