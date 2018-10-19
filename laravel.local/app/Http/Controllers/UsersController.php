<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;


class UsersController extends Controller
{
    /**
     * Show a list of all of the application's users.
     *
     * @return Response
     */
    public function index()
    {
        $users = DB::select('select * from users');
       /* foreach ($users as $user) {
            echo $user->userid;
        }*/
        $data=['userid'=>"sadsad",'username'=>"asd",'userpass'=>"dsada"];
        return response()->json($users);
    }
    public function adduser()
    {
        $users = DB::insert('insert into users (userid, username,userpass) values (?, ?, ?)', [2, 'Dayle', 'sddsa']);

    }
    public function takeuser(Request $request)
    {   $user=new User();
        $user->userid=$request->userid;
        $user->save();
        $users = DB::insert('insert into users (userid, username,userpass) values (?, ?, ?)', [$user, 'Dayle', 'sddsa']);

    }
}