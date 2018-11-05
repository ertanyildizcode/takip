<?php

namespace App\Http\Controllers;

use Ping;
use SSH;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

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
    
       // $data=['userid'=>"sadsad",'username'=>"asd",'userpass'=>"dsada"];
       // $ip="10.150.31.107";
      /* exec("ping -c 3 $ip", $output, $status);
       print_r($output);
       print_r($status);*/
      /* $url='15266515';
        $health = Ping::check($url);

        if($health == 200) {
            echo "Alive";
        } else {
            echo "Dead";
        }*/

       
       // $çıktı = shell_exec('sshpass -p "1" ssh-copy-id -i /usr/share/hvlkeys/ertan/id_rsa ubuntu@10.150.31.107 2>&1');
        //$çıktı = shell_exec('sshpass -p "1" scp /usr/share/hvlkeys/ertan/id_rsa.pub ubuntu@10.150.31.107:~/.ssh/authorized_keys 2>&1');

       //echo "<pre>$çıktı</pre>";
        //echo $process->getOutput();
        
       /* $process = new Process(array('ls', '-lsa'));
    $process->run();
    echo $process->getOutput();*/


        return response()->json($users);
    }
    public function adduser()
    {
        $sshcon=DB::delete('DELETE from sshcon');

    }
    public function takeuser(Request $request)
    {   $userid = $request->input('userid');
        $username= $request->input('username');
        $userpass = $request->input('userpass');
        $users = DB::insert('insert into users (userid, username,userpass) values (?, ?, ?)', [$userid, $username,$userpass]);
        return $users;
    }
    public function deluser(Request $request){
        $userid = $request->input('userid');
        $users = DB::delete('DELETE from users where userid=?', [$userid]);
        return $users;
    }
    public function updateuser(Request $request){
        $userid = $request->input('userid');
        $username= $request->input('username');
        $userpass = $request->input('userpass');

        $edited_userid = $request->input('edited_id');
        $edited_username= $request->input('edited_name');
        $edited_userpass = $request->input('edited_userpass');
      
        $user=DB::update('UPDATE users SET userid=?,username=?,userpass=? where userid=?',[$edited_userid,$edited_username,$edited_userpass,$userid ]);
    }
    public function validation(Request $request){
        $userid = $request->input('userid');
      /*  $username= $request->input('username');
        $userpass = $request->input('userpass');*/
        if($userid){
        $users=DB::select('SELECT * from users where userid=?',[$userid]);
        if($users){
            return response()->json('false');
        }
        else{
            return response()->json('true');
        }
    }
    else
        return response()->json('null');
        
    }
    public function validationServers(Request $request){
        $server_name = $request->input('server_name');
      /*  $username= $request->input('username');
        $userpass = $request->input('userpass');*/
        $servers=DB::select('SELECT * from servers where servername=?',[$server_name]);
        if($servers){
            return response()->json('false');
        }
        else{
        if($server_name){
            $url=$server_name;
            exec("ping -c 3 $url", $output, $status);
            
            if($status == 0) {
                return response()->json('true');
            } else {
                return response()->json('false');
            }
    
    }
    else
        return response()->json('null');
}   
    }
    public function getServers()
    {
        $servers =  DB::select('select * from servers');
        return response()->json($servers);

    }
    public function getSSHCon(){

        $sshcon=DB::select('select * from sshcon');
        return response()->json($sshcon);
    }
    public function servers(Request $request){
       
        $server_id = $request->input('server_id');
        $server_name= $request->input('server_name');
        $server_tag = $request->input('server_tag');

        $server_pass = $request->input('server_pass');
        $server_user = $request->input('server_user');
       
        $çıktı = shell_exec('sshpass -p "'.$server_pass.'" ssh-copy-id -i /usr/share/hvlkeys/ertan/id_rsa "'.$server_user.'"@"'.$server_name.'" 2>&1');
        $servers = DB::insert('insert into servers (serverid, servername,servertag) values (?, ?, ?)', [$server_id, $server_name,$server_tag]);
        $sshcon=DB::insert('insert into sshcon (sshadminuser, sshserverid,sshserverport,sshserveruser,sshuser) values (?,?, ?,?,?)', [99,$server_id,22, $server_pass,$server_user ]);
       // return $servers;
    return response()->json($çıktı);

    }
    public function configSet(Request $request){
        $server_id = $request->input('server_id');
        $server_name= $request->input('server_name');
        $ssh_user = $request->input('ssh_user');
        $komut=$request->input('komut');

        $çıktı = shell_exec('ssh -i /usr/share/hvlkeys/ertan/id_rsa "'.$ssh_user.'"@"'.$server_name.'" "'.$komut.'"');

        return response()->json($çıktı);
    }
    public function getCurrent(Request $request){
        $server_id= $request->input('server_id');
        $current=DB::select('SELECT * from sshcon where sshserverid=?',[$server_id]);
        return response()->json($current);
    }
    
  
    public function delserver(Request $request){
        $serverid = $request->input('server_id');
        $servers = DB::delete('DELETE from servers where serverid=?', [$serverid]);
        $sshcon=DB::delete('DELETE from sshcon where sshserverid=?', [$serverid]);
        return $servers;
   
    }

}