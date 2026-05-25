<?php
//api.php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AccountRequestController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::get('/users', [UserController::class, 'index']);
});

Route::post('account/account-request', [AccountRequestController::class, 'create']);
Route::post('account/{accountRequest}/accept',[AccountRequestController::class,'acceptRequest'])->middleware('is_admin');
 Route::post('account/{accountRequest}/reject', [AccountRequestController::class, 'reject']);
Route::post('account/verify', [AccountRequestController::class, 'verify']);
