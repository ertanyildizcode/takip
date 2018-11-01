<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/reactry', function () {
    return view('reactry');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/adduser', 'UsersController@index')->name('adduser');
Route::post('/takeuser', 'UsersController@takeuser')->name('takeuser');
Route::delete('/deluser', 'UsersController@deluser')->name('deluser');
Route::post('/updateuser', 'UsersController@updateuser')->name('updateuser');
Route::post('/validation', 'UsersController@validation')->name('validation');

