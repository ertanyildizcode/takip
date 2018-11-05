<?php

use Illuminate\Http\Request;
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, X-Auth-Token');
header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('users','HomeController@users');
Route::get('getusers','UsersController@index');
Route::get('adduser','UsersController@adduser');
Route::post('takeuser','UsersController@takeuser');
Route::delete('deluser','UsersController@deluser');
Route::post('updateuser','UsersController@updateuser');
Route::post('validation','UsersController@validation');

Route::post('validationServers','UsersController@validationServers');
Route::post('servers','UsersController@servers');
Route::get('getServers','UsersController@getServers');
Route::get('getSSHCon','UsersController@getSSHCon');

Route::delete('delserver','UsersController@delserver');

Route::post('configSet','UsersController@configSet');
Route::post('getCurrent','UsersController@getCurrent');


